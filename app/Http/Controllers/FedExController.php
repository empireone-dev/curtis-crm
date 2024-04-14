<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as LRequest;
use FedEx\RateService\Request;
use FedEx\RateService\ComplexType;
use FedEx\RateService\SimpleType;
use App\Models\Ticket;

class FedExController extends Controller
{
    public function get_fedex_rate(LRequest $request, $id)
    {
        $ticket = Ticket::where('id', $id)->first();

        if ($ticket->country == 'US') {
            $rateRequest = new ComplexType\RateRequest();
            //authentication & client details
            $rateRequest->WebAuthenticationDetail->UserCredential->Key = '8ddtmtAnlIN9v54W';
            $rateRequest->WebAuthenticationDetail->UserCredential->Password = 'aJ0VbE6xrJQUL3lvoKq7Ltlc8';
            $rateRequest->ClientDetail->AccountNumber = '967380539';
            $rateRequest->ClientDetail->MeterNumber = '251845103';

            // $rateRequest->TransactionDetail->CustomerTransactionId = 'Testing Rate Service Request';uniqid();
            $rateRequest->TransactionDetail->CustomerTransactionId = uniqid();

            //version
            $rateRequest->Version->ServiceId = 'crs';
            $rateRequest->Version->Major = 31;
            $rateRequest->Version->Minor = 0;
            $rateRequest->Version->Intermediate = 0;

            $rateRequest->ReturnTransitAndCommit = true;

            //shipper
            $rateRequest->RequestedShipment->PreferredCurrency = 'USD';
            $rateRequest->RequestedShipment->Shipper->Address->StreetLines = ['2626 Vista Industria Unit 15'];
            $rateRequest->RequestedShipment->Shipper->Address->City = 'Compton';
            $rateRequest->RequestedShipment->Shipper->Address->StateOrProvinceCode = 'CA';
            $rateRequest->RequestedShipment->Shipper->Address->PostalCode = 90221;
            $rateRequest->RequestedShipment->Shipper->Address->CountryCode = 'US';

            //recipient
            $rateRequest->RequestedShipment->Recipient->Address->StreetLines = array($ticket->address);
            $rateRequest->RequestedShipment->Recipient->Address->City = $ticket->city;
            $rateRequest->RequestedShipment->Recipient->Address->StateOrProvinceCode = $ticket->state;
            $rateRequest->RequestedShipment->Recipient->Address->PostalCode =$ticket->zip_code;
            $rateRequest->RequestedShipment->Recipient->Address->CountryCode = 'US';


            $rateRequest->RequestedShipment->ShippingChargesPayment->PaymentType = SimpleType\PaymentType::_SENDER;
            $rateRequest->RequestedShipment->RateRequestTypes = [SimpleType\RateRequestType::_PREFERRED, SimpleType\RateRequestType::_LIST];
            $rateRequest->RequestedShipment->PackageCount = 1;

            $rateRequest->RequestedShipment->RequestedPackageLineItems = [new ComplexType\RequestedPackageLineItem()];

            $response['processedData']['cubed_weight'] = round(floatval($request->cubed_weight));
            $response['processedData']['depth'] = round(floatval($request->length));
            $response['processedData']['width'] = round(floatval($request->width));
            $response['processedData']['length'] = round(floatval($request->height));

            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Weight->Value = round(floatval($request->cubed_weight));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Weight->Units = SimpleType\WeightUnits::_LB;
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Length = round(floatval($request->length));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Width = round(floatval($request->width));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Height = round(floatval($request->height));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Units = SimpleType\LinearUnits::_IN;
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->GroupPackageCount = 1;
            // dd($rateRequest);
            $rateServiceRequest = new Request();
            $rateServiceRequest->getSoapClient()->__setLocation(Request::PRODUCTION_URL); //use production URL

            $rateReply = $rateServiceRequest->getGetRatesReply($rateRequest); // send true as the 2nd argument to return the SoapClient's stdClass response.

            $rates = [];
            $index = 0;

            if (!empty($rateReply->RateReplyDetails)) {
                foreach ($rateReply->RateReplyDetails as $rateReplyDetail) {
                    $rates[$rateReplyDetail->ServiceType] = [];
                    $rates[$rateReplyDetail->ServiceType]['SERVICE'] = $rateReplyDetail->ServiceType;
                    if (!empty($rateReplyDetail->RatedShipmentDetails)) {
                        foreach ($rateReplyDetail->RatedShipmentDetails as $ratedShipmentDetail) {
                            $rates[$rateReplyDetail->ServiceType][$ratedShipmentDetail->ShipmentRateDetail->RateType] = $ratedShipmentDetail->ShipmentRateDetail->TotalNetCharge->Amount;
                            // $rates[$index][$ratedShipmentDetail->ShipmentRateDetail->RateType] = $ratedShipmentDetail->ShipmentRateDetail->TotalNetCharge->Amount;
                        }
                    }
                }
            }
            $response['data'] = $rates;
            return response()->json(['rates' => $rates]);
        } else if ($ticket->country == 'CA') {
            $rateRequest = new ComplexType\RateRequest();
            //authentication & client details
            $rateRequest->WebAuthenticationDetail->UserCredential->Key = 'oJOQstq8ugX59bRn';
            $rateRequest->WebAuthenticationDetail->UserCredential->Password = 'bGLyheeSPF36JACGe3VtdA593';
            $rateRequest->ClientDetail->AccountNumber = '340619137';
            $rateRequest->ClientDetail->MeterNumber = '251909481';

            // $rateRequest->TransactionDetail->CustomerTransactionId = 'Testing Rate Service Request';uniqid();
            $rateRequest->TransactionDetail->CustomerTransactionId = uniqid();

            //version
            $rateRequest->Version->ServiceId = 'crs';
            $rateRequest->Version->Major = 31;
            $rateRequest->Version->Minor = 0;
            $rateRequest->Version->Intermediate = 0;

            $rateRequest->ReturnTransitAndCommit = true;

            //shipper
            $rateRequest->RequestedShipment->Shipper->Address->StreetLines = ['7045 Beckett St', 'Unit 15'];
            $rateRequest->RequestedShipment->Shipper->Address->City = 'Mississauga';
            $rateRequest->RequestedShipment->Shipper->Address->StateOrProvinceCode = 'ON';
            $rateRequest->RequestedShipment->Shipper->Address->PostalCode = 'L5S2A3';
            $rateRequest->RequestedShipment->Shipper->Address->CountryCode = 'CA';

            $rateRequest->RequestedShipment->PreferredCurrency = 'CAD';
            //recipient
            $rateRequest->RequestedShipment->Recipient->Address->StreetLines = array($ticket->address);
            $rateRequest->RequestedShipment->Recipient->Address->City = $ticket->city;
            $rateRequest->RequestedShipment->Recipient->Address->StateOrProvinceCode = $ticket->state;
            $rateRequest->RequestedShipment->Recipient->Address->PostalCode =$ticket->zip_code;
            $rateRequest->RequestedShipment->Recipient->Address->CountryCode = 'CA';

            $rateRequest->RequestedShipment->ShippingChargesPayment->PaymentType = SimpleType\PaymentType::_SENDER;
            $rateRequest->RequestedShipment->RateRequestTypes = [SimpleType\RateRequestType::_PREFERRED, SimpleType\RateRequestType::_LIST];
            $rateRequest->RequestedShipment->PackageCount = 1;

            $rateRequest->RequestedShipment->RequestedPackageLineItems = [new ComplexType\RequestedPackageLineItem()];

            $response['processedData']['cubed_weight'] = round(floatval($request->cubed_weight));
            $response['processedData']['depth'] = round(floatval($request->length));
            $response['processedData']['width'] = round(floatval($request->width));
            $response['processedData']['length'] = round(floatval($request->height));

            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Weight->Value = round(floatval($request->cubed_weight));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Weight->Units = SimpleType\WeightUnits::_LB;
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Length = round(floatval($request->length));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Width = round(floatval($request->width));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Height = round(floatval($request->height));
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->Dimensions->Units = SimpleType\LinearUnits::_IN;
            $rateRequest->RequestedShipment->RequestedPackageLineItems[0]->GroupPackageCount = 1;
            // dd($rateRequest);
            $rateServiceRequest = new Request();
            $rateServiceRequest->getSoapClient()->__setLocation(Request::PRODUCTION_URL); //use production URL

            $rateReply = $rateServiceRequest->getGetRatesReply($rateRequest); // send true as the 2nd argument to return the SoapClient's stdClass response.

            $rates = [];
            $index = 0;

            if (!empty($rateReply->RateReplyDetails)) {
                foreach ($rateReply->RateReplyDetails as $rateReplyDetail) {
                    $rates[$rateReplyDetail->ServiceType] = [];
                    $rates[$rateReplyDetail->ServiceType]['SERVICE'] = $rateReplyDetail->ServiceType;
                    if (!empty($rateReplyDetail->RatedShipmentDetails)) {
                        foreach ($rateReplyDetail->RatedShipmentDetails as $ratedShipmentDetail) {
                            $rates[$rateReplyDetail->ServiceType][$ratedShipmentDetail->ShipmentRateDetail->RateType] = $ratedShipmentDetail->ShipmentRateDetail->TotalNetCharge->Amount;
                            // $rates[$index][$ratedShipmentDetail->ShipmentRateDetail->RateType] = $ratedShipmentDetail->ShipmentRateDetail->TotalNetCharge->Amount;
                        }
                    }
                }
            }
            $response['data'] = $rates;
            return response()->json([
                'rates' => $rates,
                'ticket'=>$ticket
            ]);
        }
    }
}
