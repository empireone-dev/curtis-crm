<!-- In your layout file (e.g., resources/views/layouts/app.blade.php) -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
    <div>
        <div class="relative isolate px-6 pt-14 lg:px-8">
            <div class="flex items-center justify-center">
                <img src="https://curtis-staging.cloud/images/logo.png" alt="Logo">
            </div>
            <div class=" w-full flex items-center justify-center py-12">
                <div class=" max-w-5xl w-full">
                    <div class="px-4 sm:px-0">
                        <!-- <h3 class="text-base font-semibold leading-7 text-gray-900">WARRANTY CLAIM </h3> -->
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">#{{$data['call_type']}} - {{ $data['ticket_id']}}</p>
                    </div>
                    <div class="px-4 py-6  sm:gap-4 sm:px-0">
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Hi {{$data['name']}},
                        </dd><br />
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            Good day!
                        </dd>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            This email is regarding your warranty claim at Curtis International Ltd.
                        </dd>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            For us to better serve you and start processing your claim, we require the following information to be uploaded in the portal below where you can also monitor the progress of your claim.
                        </dd>
                    </div>
                    <div class="mt-6 border-t border-gray-100">
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <dl class="divide-y divide-gray-100">
                                <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-blue-600">Postal Link</dt>
                                    <a target="_blank" href="https://curtis-staging.cloud/" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">https://curtis-staging.cloud</a>
                                </div>
                                <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-red-500">ID: </dt>
                                    <dd class="mt-1 text-sm leading-6 text-red-500 sm:col-span-2 sm:mt-0"> {{$data['email']}}</dd>
                                </div>
                                <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-red-500">Password</dt>
                                    <dd class="mt-1 text-sm leading-6 text-red-500 sm:col-span-2 sm:mt-0"> 12345678</dd>
                                </div>
                                <div class="px-4 py-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                                    <dt class="text-sm font-medium leading-6 text-gray-900">Track Activity</dt>
                                    <a target="_blank" href="https://curtis-staging.cloud/customer/tickets?page={{ $data['id'] }}" class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">https://curtis-staging.cloud/customer/tickets?page={{ $data['id'] }}</a>
                                </div>

                            </dl>
                        </dd>
                    </div><br /><br />
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        An email with warranty instructions will be provided to you as soon as we receive the complete documentation as required above.
                    </dd>
                    <dd class="mt-1 text-sm leading-6 font-black text-gray-700 sm:col-span-2 sm:mt-0">
                        For your reference, please see the complete overview of our warranty process attached to this email.
                    </dd><br />
                    <dd class="mt-6 text-sm leading-6 italic text-red-500 sm:col-span-2 sm:mt-0">
                        **Please note that this ticket will be automatically close if no update within 7 days.**<br /><br />

                        **Please ensure that the Case File Number is in the subject line. **<br /><br />

                        **Note -Please do not throw/recycle the unit until all the required information has been validated. You will receive a notification to do so when we have already received and verified all the important information. If the unit is disposed of or is no longer with you, we cannot assist you further with your claim.**
                        <br /><br />
                        **Note - We are open from 9 AM - 6 PM EST, Mondays to Fridays. Response time would be 48 to 72 business hours.
                    </dd>
                </div>
            </div>

        </div>
    </div>

</body>

</html>