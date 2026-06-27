<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'converted' => 'Converted',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('project_type')
                    ->sortable(),

                Tables\Columns\TextColumn::make('city')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\SelectColumn::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'converted' => 'Converted',
                    ])
                    ->selectablePlaceholder(false)
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make()
                    ->modalHeading('Update Booking Status')
                    ->modalButton('Save Changes'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Section::make('Customer Information')
                    ->schema([
                        TextEntry::make('name'),
                        TextEntry::make('email'),
                        TextEntry::make('phone'),
                        TextEntry::make('city'),
                    ])->columns(2),

                Section::make('Project Details')
                    ->schema([
                        TextEntry::make('project_type'),
                        TextEntry::make('approx_size'),
                        TextEntry::make('message')
                            ->columnSpanFull()
                            ->placeholder('No message provided.'),
                    ])->columns(2),

                Section::make('Contact Preferences')
                    ->schema([
                        TextEntry::make('preferred_contact')
                            ->badge()
                            ->color('info'),
                        TextEntry::make('preferred_time')
                            ->placeholder('N/A'),
                        TextEntry::make('status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'new' => 'warning',
                                'contacted' => 'primary',
                                'converted' => 'success',
                                default => 'gray',
                            }),
                    ])->columns(3),

                Section::make('Moodboard Images')
                    ->schema([
                        TextEntry::make('moodboard_urls')
                            ->label('Moodboard Images')
                            ->html()
                            ->formatStateUsing(function ($state) {
                                if (empty($state)) return 'No moodboard images selected.';
                                $html = '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
                                foreach ($state as $url) {
                                    $html .= '<a href="' . e($url) . '" target="_blank" style="display: inline-block;">';
                                    $html .= '<img src="' . e($url) . '" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc;" />';
                                    $html .= '</a>';
                                }
                                $html .= '</div>';
                                return $html;
                            })
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
        ];
    }
}
