<?php

namespace App\Http\Requests\Movie;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [Rule::requiredIf(!$this->has('schedules_ids')),'max:50'],
            'created_at' => [Rule::requiredIf(!$this->has('schedules_ids')),'date_format:Y-m-d'],
            'image' => [Rule::requiredIf(!$this->has('schedules_ids')),'file','max:1024'],
            'user_id' => [Rule::requiredIf(!$this->has('schedules_ids')),'exists:users,id'],
            'schedules_ids' => [Rule::requiredIf($this->has('schedules_ids'))]
        ];
    }
}
