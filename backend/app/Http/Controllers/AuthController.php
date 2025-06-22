<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
public function register(Request $request)
{
    try {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'USER',
        ]);

        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'status'  => true,
            'message' => 'User registered successfully.',
            'data'    => [
                'user'  => $user,
                'token' => $token,
            ],
            'error'   => null,
        ], 201);

    } catch (\Throwable $e) {
        \Log::error($e->getMessage());

        return response()->json([
            'status'  => false,
            'message' => 'Registration failed.',
            'data'    => null,
            'error'   => $e->getMessage(),
        ], 500);
    }
}


public function login(Request $request)
{
    try {
        $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'status'  => 'fail',
                'message' => 'Unauthorized',
                'data'    => null,
                'error'   => 'Invalid credentials',
            ], 401);
        }

        $user  = auth()->user();
        $token = $user->createToken('API Token')->accessToken;

        return response()->json([
            'status'  => 'success',
            'message' => 'Login successful',
            'data'    => [
                'user'  => $user,
                'token' => $token,
                'role'  => $user->role,
            ],
            'error' => null,
        ], 200);

    } catch (\Throwable $e) {
        \Log::error($e->getMessage());

        return response()->json([
            'status'  => 'error',
            'message' => 'Login failed',
            'data'    => null,
            'error'   => $e->getMessage(),
        ], 500);
    }
}

}
