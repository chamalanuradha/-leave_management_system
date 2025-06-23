<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;
use Illuminate\Support\Facades\DB;


class LeaveController extends Controller
{

public function index()
{
    try {
        if (Auth::user()->role !== 'ADMIN') {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized: Only admins can view all leave records.',
                'data' => null,
                'error' => 'Access denied'
            ], 403);
        }

        $leaves = Leave::with('user')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Leave records fetched successfully.',
            'data' => $leaves,
            'error' => null
        ], 200);

    } catch (Exception $e) {
        \Log::error('Error fetching leaves: ' . $e->getMessage());

        return response()->json([
            'status' => 'fail',
            'message' => 'Failed to fetch leave records.',
            'data' => null,
            'error' => $e->getMessage()
        ], 500);
    }
}  
public function myLeaves()
{
    try {
        $userId = Auth::id();

        $leaves = Leave::where('user_id', $userId)->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Your leave records fetched successfully.',
            'data'    => $leaves,
            'error'   => null
        ], 200);

    } catch (Exception $e) {
        \Log::error('Error fetching user-specific leaves: ' . $e->getMessage());
        return response()->json([
            'status'  => 'fail',
            'message' => 'Failed to fetch your leave records.',
            'data'    => null,
            'error'   => $e->getMessage()
        ], 500);
    }
}

public function store(Request $request)
{
        try {
            $request->validate([
                'leave_date' => 'required|date',
                'leave_type' => 'required|string',
                'reason'     => 'nullable|string',
            ]);

            $leave = Leave::create([
                'user_id'    => Auth::id(),
                'leave_date' => $request->leave_date,
                'leave_type' => $request->leave_type,
                'reason'     => $request->reason,
                'status'     => 'PENDING',
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Leave request submitted.',
                'data'    => $leave,
                'error'   => null
            ], 201);

        } catch (Exception $e) {
            Log::error('Error creating leave: ' . $e->getMessage());
            return response()->json([
                'status'  => 'fail',
                'message' => 'Leave request failed.',
                'data'    => null,
                'error'   => $e->getMessage()
            ], 500);
        }
    }



public function update(Request $request, $id)
{
    try {
    
        if (Auth::user()->role !== 'ADMIN') {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized: Only admins can update leave status.',
                'data' => null,
                'error' => 'Access denied'
            ], 403);
        }

        $request->validate([
            'status' => 'required|in:PENDING,APPROVED,REJECTED'
        ]);

        $leave = Leave::findOrFail($id);
        $leave->status = $request->status;
        $leave->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Leave status updated.',
            'data' => $leave,
            'error' => null
        ], 200);

    } catch (ModelNotFoundException $e) {
        return response()->json([
            'status' => 'fail',
            'message' => 'Leave record not found.',
            'data' => null,
            'error' => $e->getMessage()
        ], 404);

    } catch (Exception $e) {
        return response()->json([
            'status' => 'fail',
            'message' => 'Failed to update leave status.',
            'data' => null,
            'error' => $e->getMessage()
        ], 500);
    }
}



public function leaveStatusSummary()
{
    try {
        if (Auth::user()->role !== 'ADMIN') {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized: Only admins can access this chart.',
                'data' => null,
                'error' => 'Access denied'
            ], 403);
        }

        $summary = Leave::select('status', DB::raw('count(*) as total'))
                        ->groupBy('status')
                        ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Leave status summary fetched successfully.',
            'data' => $summary,
            'error' => null
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Error fetching leave status summary: ' . $e->getMessage());
        return response()->json([
            'status' => 'fail',
            'message' => 'Failed to fetch summary.',
            'data' => null,
            'error' => $e->getMessage()
        ], 500);
    }
}


public function leaveTypePerUser()
{
    try {
        if (Auth::user()->role !== 'ADMIN') {
            return response()->json([
                'status' => 'fail',
                'message' => 'Unauthorized: Only admins can access this chart.',
                'data' => null,
                'error' => 'Access denied'
            ], 403);
        }

        $data = Leave::with('user')
            ->select('user_id', 'leave_type', DB::raw('count(*) as total'))
            ->groupBy('user_id', 'leave_type')
            ->get()
            ->groupBy('user_id')
            ->map(function ($leaves, $userId) {
                return [
                    'user' => $leaves->first()->user->name,
                    'types' => $leaves->map(function ($leave) {
                        return [
                            'type' => $leave->leave_type,
                            'count' => $leave->total
                        ];
                    })->values()
                ];
            })->values();

        return response()->json([
            'status' => 'success',
            'message' => 'Leave types by user fetched successfully.',
            'data' => $data,
            'error' => null
        ], 200);

    } catch (\Exception $e) {
        \Log::error('Error fetching leave types per user: ' . $e->getMessage());
        return response()->json([
            'status' => 'fail',
            'message' => 'Failed to fetch leave types.',
            'data' => null,
            'error' => $e->getMessage()
        ], 500);
    }
}



}
