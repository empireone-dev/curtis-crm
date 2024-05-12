import AgentLayout from '@/app/layouts/agent/agent-layout'
import React from 'react'

export default function AgentPage({auth}) {
    const account = auth.user;
  return (
    <AgentLayout
    account={account}
    >AgentPage</AgentLayout>
  )
}
