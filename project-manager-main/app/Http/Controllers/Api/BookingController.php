<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Resources\BookingResource;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Store a newly created booking in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'project_type' => 'required|in:Residential,Retail,Corporate',
            'approx_size' => 'required|string|max:255',
            'message' => 'nullable|string',
            'moodboard_urls' => 'nullable|array',
            'moodboard_urls.*' => 'url',
            'preferred_contact' => 'required|in:whatsapp,email,call',
            'preferred_time' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $booking = Booking::create($validator->validated());

        return response()->json([
            'success' => true,
            'id' => $booking->id,
            'message' => 'Booking saved successfully.'
        ], 201);
    }
}
