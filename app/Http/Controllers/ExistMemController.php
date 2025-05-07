<?php

namespace App\Http\Controllers;

use App\Models\ExistingMember;
use Illuminate\Http\Request;

class ExistMemController extends Controller
{
    public function admin(){
        $member = ExistingMember::all();
        return inertia('Admin/ExistingMember', ['members' => $member]);
    }

    public function create(){
        return inertia('Admin/Users/AddMem');
    }

    public function store(Request $request){
        $fields = $request->validate([
            'memberID' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
        ]);

        ExistingMember::create([
            'memberID' => $fields['memberID'],
            'phoneNumber' => $fields['phoneNumber'],
        ]);

        return redirect('/admin/users')->with('success', 'Member created successfully!');
        
    }

    public function edit($id){
        $member = ExistingMember::find($id);
        return inertia('Admin/Users/EditMem', [
            'member' => $member
        ]);
    }

    public function update($id, Request $request){
        $fields = $request->validate([
            'memberID' => 'required|string|max:255',
            'phoneNumber' => 'required|string|max:255',
        ]);

        $member = ExistingMember::find($id);
        $member->update([
            'memberID' => $fields['memberID'],
            'phoneNumber' => $fields['phoneNumber'],
        ]);

        return redirect('/admin/users')->with('success', 'Member updated successfully!');

    }

    public function delete($id){
        $member = ExistingMember::find($id);
        $member->delete();
        return redirect('/admin/users')->with('success', 'Member deleted successfully!');
    }
}
