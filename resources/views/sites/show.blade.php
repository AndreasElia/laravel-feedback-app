<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ $site->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    @if (!$site->feedback->count())
                        This site does not have any feedback yet.
                    @endif

                    <div class="space-y-5">
                        @foreach ($site->feedback as $fb)
                            <div class="border rounded-lg p-5">
                                <div>
                                    <strong>Message:</strong><br>
                                    {{ $fb->message }}
                                </div>

                                <div>
                                    <strong>Screenshot:</strong><br>
                                    <img src="{{ $fb->screenshot }}" alt="">
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
