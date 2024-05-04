<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailTemplate extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;
    public $ticket;
    public function __construct($data, $ticket)
    {
        $this->data = $data;
        $this->ticket = $ticket;
    }

    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Email Template',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         markdown: 'mail.email-template',
    //     );
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    // public function attachments(): array
    // {
    //     return [];
    // }
    public function build()
    {
        // return $this->from('scitdept@empireonegroup.com')
        // ->markdown('emails.tickets')->with($this->data);
        $subject = '';
        $data = $this->ticket['id'];
        $length = strlen($data);
        $id = '';
        if ($length == 1) {
            $id = date("dmy") . '00000' . $data;
        } else if ($length == 2) {
            $id = date("dmy") . '0000' . $data;
        } else if ($length == 3) {
            $id = date("dmy") . '000' . $data;
        }

        if ($this->ticket['call_type'] == 'Parts') {
            $subject = '#PS' . $id;
        } else if ($this->ticket['call_type'] == 'CF-Warranty Claim') {
            $subject = '#CF' . $id;
        } else if ($this->ticket['call_type'] == 'TS-Tech Support') {
            $subject = '#TS' . $id;
        }
        return $this->from('support2@curtiscs.com')
            ->subject($subject)
            ->view('mail.validation') // Assuming 'mail.validation' is your HTML email template
            ->with(['htmlContent' => $this->data]);
    }
}
