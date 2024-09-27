<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'type' => $this->type,
            'category' => $this->category,
            'amount' => $this->amount,
            'total' => $this->total,
            'transaction_date' => $this->transaction_date->format('Y-m-d')
        ];
    }
}
