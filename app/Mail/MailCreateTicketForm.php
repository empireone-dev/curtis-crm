<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailCreateTicketForm extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $data;
    public function __construct($data)
    {
        $this->data = $data;
    }
    /**
     * Get the message envelope.
     */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Mail Create Ticket Form',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         markdown: 'mail.mail-create-ticket-form',
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
        if ($this->data['call_type'] == 'CF-Warranty Claim') {
            return $this->from('scitdept@empireonegroup.com')
                ->subject($this->data['ticket_id'])
                ->markdown('mail.mail-create-ticket-form')->with($this->data);
        } else if ($this->data['call_type'] == 'Parts') {
            return $this->from('scitdept@empireonegroup.com')
                ->subject($this->data['ticket_id'])
                ->markdown('mail.parts-initial-email')->with($this->data);
        }
    }
}
