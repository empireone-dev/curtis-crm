import AgentLayout from '@/app/layouts/agent/agent-layout';
import React from 'react'

export default function AgentDirectEmailIDPage({ auth }) {
    const account = auth.user;
  return (
    <AgentLayout account={account}>
        AgentDirectEmailIDPage
    </AgentLayout>
  )
}
