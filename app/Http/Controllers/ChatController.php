<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;
use App\Mail\MessageNotifier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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

    public function startChat (User $user) {
        $chat = Chat::create( [
            'sender_id' => Auth::user()->id,
            'receiver_id'=> $user->id,
            'message' => 'Hello, how are you?',
            'quote_id' => null,
            'attachments' => null,
        ] );
        $sender = User::find(Auth::user()->id);
        $receiver = $user;

        // $sender = $sender->email;
        $messageContent = 'Hello, how are you?';
        $subjectText = 'You have a new message from!';
        $link = url('/');

        Mail::to($receiver->email)->send(new MessageNotifier($sender, $messageContent, $subjectText, $link));

        $chat->notifications()->create([
            'user_id' => $receiver->id,
            'type' => 'message',
            'data' => [
                'message' => $messageContent,
                'sender' => $sender->fullname,
                'link' => $link,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $chat = Chat::create([
            'sender_id' => Auth::user()->id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'quote_id' => $request->quote_id,
            'attachments' => $request->attachments,
        ]);
        $sender = User::find(Auth::user()->id);
        $receiver = User::find($request->receiver_id);

        // $sender = $sender->email;
        $messageContent = $request->message;
        $subjectText = 'You have a new message from!';
        $link = url('/');

        Mail::to($receiver->email)->send(new MessageNotifier($sender, $messageContent, $subjectText, $link));

        $chat->notifications()->create([
            'user_id' => $receiver->id,
            'type' => 'message',
            'data' => [
                'message' => $messageContent,
                'sender' => $sender->fullname,
                'link' => $link,
            ]
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
