<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user()->id;
        $chats = Chat::where('sender_id', $user)->orWhere('receiver_id', $user)->with('sent', 'received')->orderBy('id', 'asc')->get();
        return response()->json($chats);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Chat::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'quote_id' => $request->quote_id,
            'attachments' => $request->attachments,
        ]);

        return redirect()->back();
    }

    public function readMessage (Chat $chat) {
        if($chat->read == 0){
            $chat->read = 1;
            $chat->save();
        }
        return response()->json(['status' => 'it worked', $chat]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatRequest $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        //
    }

    public function sendMessage (Request $request) {
        $chat = Chat::create([

        ]);

        broadcast(new MessageSent($chat))->toOthers();
    }
}
