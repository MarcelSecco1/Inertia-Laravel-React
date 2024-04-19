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
            'nome' => ['required', 'string', 'max:255', 'min:3'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'senha' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $request->nome,
            'email' => $request->email,
            'password' => bcrypt($request->senha),
        ]);
    }

    public function edit(int $id, Request $request)
    {
        $user = User::findOrFail($id);
        if ($request->confSenha) {
            $request->validate([
                'nome' => ['required', 'string', 'max:255', 'min:3'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
                'senha' => ['required', 'string', 'min:8'],
                'confSenha' => ['required', 'string', 'min:8', 'same:senha'],
            ]);
            $user->password = bcrypt($request->confSenha);
        } else {
            $request->validate([
                'nome' => ['required', 'string', 'max:255', 'min:3'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $id],
            ]);
        }

        $user->update([
            'name' => $request->nome,
            'email' => $request->email,
        ]);
    }
    public function delete(int $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }
}
