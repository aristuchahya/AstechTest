<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaction = Transaction::all();

        if ($transaction) {
            return response()->json([
                'status' => true,
                'message' => 'Transaction retrieved successfully',
                'transaction' => TransactionResource::collection($transaction),
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Transaction not found',
            ], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        

        $validator = Validator::make ($request->all(), [
            'type' => 'required|in:Pemasukan,Pengeluaran',
            'category' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Errors',
                'errors' => $validator->errors(),
            ]);
        }

        $latestTransaction = Transaction::orderBy('transaction_date', 'desc')->first();
        $currentTotal = $latestTransaction ? $latestTransaction->total : 0;

        if ($request->type === 'Pemasukan') {
            $newTotal = $currentTotal + $request->amount;
             error_log("Pemasukan: total sebelumnya: $currentTotal, amount: " . $request->amount . ", total baru: $newTotal");
        } elseif ($request->type === 'Pengeluaran') {
            $newTotal = $currentTotal - $request->amount;
            error_log("Pengeluaran: total sebelumnya: $currentTotal, amount: " . $request->amount . ", total baru: $newTotal");


             if ($newTotal < 0) {
            return response()->json([
                'message' => 'Pengeluaran melebihi total saat ini. Tidak dapat melakukan transaksi.',
            ], 400);
        }
        }

        $transaction = Transaction::create ([
            'type' => $request->type,
            'category' => $request->category,
            'amount' => $request->amount,
            'total' => $newTotal,
            'transaction_date' => $request->transaction_date,
        ]);
        

        if ($transaction) {
            return response()->json([
                'status' => true,
                'message' => 'Transaction created successfully',
                'transaction' => new TransactionResource($transaction),
            ], 201);
        } else {
            return response()->json([
                'message' => 'Transaction failed to create',   
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => false,
                'message' => 'Transaction not found',
            ], 404);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Transaction retrieved successfully',
                'transaction' => new TransactionResource($transaction),
            ], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'status' => false,
                'message' => 'Transaction not found',
            ], 404);
        }

        $transaction->delete();
        return response()->json([
            'status' => true,
            'message' => 'Transaction deleted successfully',
        ], 201);
    }
}
