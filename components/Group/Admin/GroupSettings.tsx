// /src/components/Group/Admin/GroupSettings.tsx
'use client'

import { useState } from 'react'
import { useGroupStore } from '@/lib/stores/groupStore'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pencil, Save, X, Lock } from 'lucide-react'

const GroupSettings = () => {
  const { currentGroup, updateGroup } = useGroupStore()
  const [groupName, setGroupName] = useState(currentGroup?.name || '')
  const [groupDescription, setGroupDescription] = useState(currentGroup?.description || '')
  const [groupPassword, setGroupPassword] = useState(currentGroup?.password || '')
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveSettings = async () => {
    if (!currentGroup) return

    await updateGroup(currentGroup.id, {
      name: groupName,
      description: groupDescription,
      password: groupPassword,
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          Group Settings
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Enter group description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={groupPassword}
                onChange={(e) => setGroupPassword(e.target.value)}
                placeholder="Enter group password"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Group Name</Label>
              <p className="text-sm font-medium">{currentGroup?.name}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="text-sm">{currentGroup?.description}</p>
            </div>

            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">Password</Label>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">••••••••</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default GroupSettings