<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MovieResource extends JsonResource
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
            'attributes'=> [
                'name' => Str::limit( $this->resource->name , 30, '...'),
                'status' => $this->resource->getValueStatus(),
                'image' => env('APP_URL') .'/'. $this->resource->image,
                'created_at' => $this->resource->created_at->format('Y-m-d'),
                'user_id' => $this->resource->user_id
            ],
            'relationships' => [
                'schedules' => ScheduleResource::collection( $this->resource->schedules ),
                'user' => $this->resource->user
            ],
            'links' => [
                'self' => route('movies.show', $this->resource)
            ]
        ];
    }
}
