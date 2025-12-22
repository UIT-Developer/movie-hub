// src/app/(admin)/halls/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, DoorOpen } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@movie-hub/shacdn-ui/dropdown-menu';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@movie-hub/shacdn-ui/dialog';
import { Label } from '@movie-hub/shacdn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { useToast } from '../_libs/use-toast';
import { useHallsGroupedByCinema, useCreateHall, useUpdateHall, useDeleteHall } from '@/libs/api';
import type { Hall, HallType, CreateHallRequest } from '@/libs/api/types';

export default function HallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [formData, setFormData] = useState<Partial<CreateHallRequest>>({
    cinemaId: '',
    name: '',
    type: 'STANDARD' as HallType,
    screenType: '',
    soundSystem: '',
    features: [],
    layoutType: 'STANDARD',
  });
  useToast();

  // API hooks - using workaround hook for grouped data
  const { data: hallsByCinema = {}, isLoading: loading } = useHallsGroupedByCinema();
  const createHall = useCreateHall();
  const updateHall = useUpdateHall();
  const deleteHall = useDeleteHall();

  // Extract all halls and cinemas from grouped data
  const cinemas = Object.values(hallsByCinema).map(group => group.cinema);
  const halls = Object.values(hallsByCinema).flatMap(group => group.halls);

  const handleSubmit = async () => {
    try {
      if (selectedHall) {
        await updateHall.mutateAsync({ id: selectedHall.id, data: formData });
      } else {
        // Ensure cinemaId is set before creating
        if (!formData.cinemaId) {
          alert('Please select a cinema');
          return;
        }
        await createHall.mutateAsync(formData as CreateHallRequest);
      }
      setDialogOpen(false);
      resetForm();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const handleDelete = async () => {
    if (!selectedHall) return;
    try {
      await deleteHall.mutateAsync(selectedHall.id);
      setDeleteDialogOpen(false);
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const resetForm = () => {
    setFormData({
      cinemaId: '',
      name: '',
      type: 'STANDARD',
      screenType: '',
      soundSystem: '',
      features: [],
      layoutType: 'STANDARD',
    });
    setSelectedHall(null);
  };

  const openEditDialog = (hall: Hall) => {
    setSelectedHall(hall);
    setFormData({
      cinemaId: hall.cinemaId,
      name: hall.name,
      type: hall.type,
      screenType: hall.screenType || '',
      soundSystem: hall.soundSystem || '',
      features: hall.features || [],
      layoutType: hall.layoutType || 'STANDARD',
    });
    setDialogOpen(true);
  };

  const filteredHalls = halls.filter((hall) =>
    hall.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group filtered halls by cinema (don't shadow the API `hallsByCinema` variable)
  const groupedFilteredHalls = filteredHalls.reduce((acc, hall) => {
    const cinemaId = hall.cinemaId;
    if (!acc[cinemaId]) {
      acc[cinemaId] = [];
    }
    acc[cinemaId].push(hall);
    return acc;
  }, {} as Record<string, Hall[]>);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      STANDARD: 'bg-gray-100 text-gray-700',
      VIP: 'bg-purple-100 text-purple-700',
      IMAX: 'bg-blue-100 text-blue-700',
      FOUR_DX: 'bg-orange-100 text-orange-700',
      PREMIUM: 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string | undefined) => {
    const colors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700',
      MAINTENANCE: 'bg-yellow-100 text-yellow-700',
      CLOSED: 'bg-red-100 text-red-700',
    };
    return (status && colors[status]) || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Halls (Auditoriums)</h1>
          <p className="text-gray-500 mt-1">Manage cinema halls and screening rooms</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hall
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search halls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Halls ({filteredHalls.length})</CardTitle>
          <CardDescription>
            Halls organized by cinema location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : Object.keys(groupedFilteredHalls).length === 0 ? (
            <div className="text-center py-8">No halls found</div>
          ) : (
            Object.entries(groupedFilteredHalls).map(([cinemaId, cinemaHalls]) => {
              const cinema = cinemas.find((c) => c.id === cinemaId);
              return (
                <div key={cinemaId} className="space-y-4">
                  {/* Cinema Header */}
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-purple-100">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <DoorOpen className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{cinema?.name || 'Unknown Cinema'}</h3>
                      <p className="text-sm text-gray-500">{cinema?.city || ''} • {cinemaHalls.length} halls</p>
                    </div>
                  </div>

                  {/* Halls Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cinemaHalls.map((hall) => (
                      <Card key={hall.id} className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <DoorOpen className="h-4 w-4 text-purple-600" />
                                <h4 className="font-bold text-lg">{hall.name}</h4>
                              </div>
                              <Badge className={getTypeColor(hall.type)}>
                                {hall.type}
                              </Badge>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditDialog(hall)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedHall(hall);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Capacity</span>
                              <span className="font-semibold">{hall.capacity} seats</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Rows</span>
                              <span className="font-semibold">{hall.rows} rows</span>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="text-gray-600 mb-1">Screen</div>
                              <div className="font-medium">{hall.screenType || 'Standard'}</div>
                            </div>
                            <div>
                              <div className="text-gray-600 mb-1">Audio</div>
                              <div className="font-medium">{hall.soundSystem || 'Standard Audio'}</div>
                            </div>
                            {hall.features && hall.features.length > 0 && (
                              <div>
                                <div className="text-gray-600 mb-1">Features</div>
                                <div className="flex flex-wrap gap-1">
                                  {hall.features.map((feature, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="pt-2">
                              <Badge className={getStatusColor(hall.status)}>
                                {hall.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedHall ? 'Edit Hall' : 'Add New Hall'}
            </DialogTitle>
            <DialogDescription>
              Fill in the hall details below
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cinema">Cinema *</Label>
              <Select
                value={formData.cinemaId}
                onValueChange={(value) =>
                  setFormData({ ...formData, cinemaId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cinema" />
                </SelectTrigger>
                <SelectContent>
                  {cinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hall Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Hall 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: HallType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STANDARD">Standard</SelectItem>
                    <SelectItem value="PREMIUM">Premium</SelectItem>
                    <SelectItem value="IMAX">IMAX</SelectItem>
                    <SelectItem value="FOUR_DX">4DX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="screenType">Screen Type</Label>
                <Input
                  id="screenType"
                  value={formData.screenType}
                  onChange={(e) =>
                    setFormData({ ...formData, screenType: e.target.value })
                  }
                  placeholder="4K Digital"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soundSystem">Sound System</Label>
                <Input
                  id="soundSystem"
                  value={formData.soundSystem}
                  onChange={(e) =>
                    setFormData({ ...formData, soundSystem: e.target.value })
                  }
                  placeholder="Dolby Atmos"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="layoutType">Layout Type</Label>
              <Select
                value={formData.layoutType}
                onValueChange={(value) =>
                  setFormData({ ...formData, layoutType: value as 'STANDARD' | 'DUAL_AISLE' | 'STADIUM' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STANDARD">Standard</SelectItem>
                  <SelectItem value="DUAL_AISLE">Dual Aisle</SelectItem>
                  <SelectItem value="STADIUM">Stadium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Features (Optional)</Label>
              <Input
                value={(formData.features || []).join(', ')}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()).filter(Boolean) })
                }
                placeholder="3D, ATMOS, Wheelchair access (comma-separated)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {selectedHall ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Hall</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedHall?.name}&quot;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
