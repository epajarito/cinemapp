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
                'hour' => isset($this->resource->withOutDateFormat)
                    ? $this->resource->hour->format('H:i')
                    : $this->resource->hour->format('g:i A'),

                'status' => isset($this->resource->withOutStatusValue)
                    ? $this->resource->status
                    : $this->resource->getValueStatus(),

                'user_id' => $this->resource->user_id
            ],
            'relationships' => [
                'user' => $this->resource->user,
                //'movies' => MovieResource::collection($this->resource->movies)
            ],
            'links' => [
                'self' => route('schedules.show', $this->resource)
            ]
        ];
    }
}
