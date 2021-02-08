<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    @if (!$sites->count())
                        You have not created any sites yet.
                    @endif

                    <div class="space-y-5">
                        @foreach ($sites as $site)
                            <div class="border rounded-lg p-5">
                                <div class="flex justify-between items-center">
                                    <a class="font-semibold text-xl" href="{{ route('sites.show', $site) }}">
                                        {{ $site->name }}
                                    </a>

                                    <div class="bg-blue-50 rounded-full px-3 py-1 text-xs font-semibold">
                                        {{ $site->key }}
                                    </div>
                                </div>

                                {{ $site->url }}
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
