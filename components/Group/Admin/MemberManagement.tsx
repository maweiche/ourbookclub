// // /src/components/Group/Admin/MemberManagement.tsx
'use client'

import { useState } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { User } from '@/lib/types'
import { Group } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserPlus, Shield, Trash2 } from 'lucide-react'

interface MemberManagementProps {
  group: Group;
}

const MemberManagement = ({ group }: MemberManagementProps) => {
  const { updateGroup } = useGroupStore()
  const [newMemberEmail, setNewMemberEmail] = useState('')

  const handleRemoveMember = async (userId: string) => {
    const updatedMemberIds = group.memberIds.filter(id => id !== userId)
    await updateGroup(group.id, {
      memberIds: updatedMemberIds
    })
  }

  const handlePromoteToAdmin = async (userId: string) => {
    const updatedAdminIds = [...group.adminIds, userId]
    await updateGroup(group.id, {
      adminIds: updatedAdminIds
    })
  }

  const handleAddMember = () => {
    // Add member logic here
    setNewMemberEmail('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
        <div className="flex space-x-4">
          <Input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Current Members</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.memberIds.map((userId) => (
              <TableRow key={userId}>
                <TableCell className="font-medium">{userId}</TableCell>
                <TableCell>
                  {group.adminIds.includes(userId) ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Member</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {!group.adminIds.includes(userId) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePromoteToAdmin(userId)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Make Admin
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveMember(userId)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MemberManagement;