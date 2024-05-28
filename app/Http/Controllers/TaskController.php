<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function index()
    {
        // return Task::first();
        \Log::info('こんにちは');
        return response()->json(Task::all());
    }

     public function show($task)
    {
        return Task::findOrFail($task);
    }

     public function store(Request $request)
    {
        Log::info('storeメソッドが実行されました', $request->all());

        $task = Task::create($request->all());

        return response()->json($task, 201);
    }

     public function update(Request $request, $id)
    {
        Log::info('updateメソッドが実行されました', $request->all());


        $task = Task::find($id);

        $updateTask = $task->update($request->all());

        return response()->json($task);
    }

     public function delete($id)
    {
        $task = Task::find($id);
    
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }
        
        $task->delete();
    
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
