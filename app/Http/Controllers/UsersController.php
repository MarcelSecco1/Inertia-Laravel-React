<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Dashboard', [
            'users' => $users,
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'nome' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'senha' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $request->nome,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['message' => 'Usuário criado com sucesso!'], 201, ['Content-Type' => 'application/json']);
    }
}
