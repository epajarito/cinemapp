<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->getRouteKey(),
            'type' => 'schedules',
            'attributes' => [
                'hour' => $this->resource->hour->format('H:i'),
                'status' => $this->resource->status
            ],
            'relationships' => [
                'user' => $this->resource->user
            ],
            'links' => [
                'self' => route('schedules.show', $this->resource)
            ]
        ];
    }
}
