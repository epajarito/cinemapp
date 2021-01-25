<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Movie\StoreRequest;
use App\Http\Requests\Movie\UpdateRequest;
use App\Http\Resources\MovieResource;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $movies = Movie::latest('updated_at')->paginate();
        return MovieResource::collection($movies);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $movie = new Movie();
        $movie->fill($request->validated());
        $movie->image = $this->upload($request->image);
        $movie->save();
        return response()->noContent();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        return new MovieResource($movie);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit(Movie $movie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Movie $movie)
    {
        if($request->has('schedules_ids')){
            $schedules_ids = Str::of( $request->input('schedules_ids') )
                ->explode(',')
                ->toArray();

            $movie->schedules()->sync($schedules_ids);
            return response()->noContent();
        }
        $movie->fill($request->validated());
        $movie->image = $this->upload($request->image);
        $movie->update();
        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        $movie->markAsCancelled();
        return response()->noContent();
    }

    private function upload(UploadedFile $uploadedFile)
    {
        $name = time() . ".{$uploadedFile->getClientOriginalExtension()}";
        return "storage/" . $uploadedFile->storeAs('movies',$name,'public');
    }
}
