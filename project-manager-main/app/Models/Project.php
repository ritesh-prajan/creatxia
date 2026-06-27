<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Project extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['title', 'description'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_image')->singleFile();

        $this->addMediaCollection('gallery_images');
    }
}