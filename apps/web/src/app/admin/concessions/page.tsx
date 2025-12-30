'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Plus, Pencil, Trash2, ShoppingBag, Filter, Package, AlertCircle } from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@movie-hub/shacdn-ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Label } from '@movie-hub/shacdn-ui/label';
import { Input } from '@movie-hub/shacdn-ui/input';
import { Textarea } from '@movie-hub/shacdn-ui/textarea';
import { Badge } from '@movie-hub/shacdn-ui/badge';
import { useToast } from '../_libs/use-toast';
import {
  useConcessions,
  useCreateConcession,
  useUpdateConcession,
  useDeleteConcession,
  useCinemas,
} from '@/libs/api';
import type {
  Concession,
  CreateConcessionRequest,
  UpdateConcessionRequest,
  ConcessionCategory,
} from '@/libs/api/types';

const CATEGORIES: { value: ConcessionCategory | string; label: string; icon: string }[] = [
  { value: 'FOOD', label: 'Food', icon: '🍿' },
  { value: 'DRINK', label: 'Drink', icon: '🥤' },
  { value: 'COMBO', label: 'Combo', icon: '🍔' },
  { value: 'MERCHANDISE', label: 'Merchandise', icon: '🎁' },
];

export default function ConcessionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingConcession, setEditingConcession] = useState<Concession | null>(null);
  const [filterCinemaId, setFilterCinemaId] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAvailable, setFilterAvailable] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    category: 'FOOD',
    price: 0,
    imageUrl: '',
    available: true,
    inventory: 0,
    cinemaId: '',
    allergens: [] as string[],
  });
  const { toast } = useToast();

  // API hooks
  const { data: cinemasData = [] } = useCinemas();
  const cinemas = Array.isArray(cinemasData) ? cinemasData : [];

  const { data: concessionsData = [], isLoading: loading, error } = useConcessions({
    cinemaId: filterCinemaId !== 'all' ? filterCinemaId : undefined,
    category: filterCategory !== 'all' ? (filterCategory as ConcessionCategory) : undefined,
    available: filterAvailable !== 'all' ? filterAvailable === 'true' : undefined,
  });
  const concessions = concessionsData || [];

  const createConcession = useCreateConcession();
  const updateConcession = useUpdateConcession();
  const deleteConcession = useDeleteConcession();

  // Show error toast if query fails
  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch concessions',
      variant: 'destructive',
    });
  }

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Name is required',
        variant: 'destructive',
      });
      return;
    }

    if (formData.price < 0) {
      toast({
        title: 'Error',
        description: 'Price cannot be negative',
        variant: 'destructive',
      });
      return;
    }

    if (formData.inventory !== undefined && formData.inventory < 0) {
      toast({
        title: 'Error',
        description: 'Inventory cannot be negative',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingConcession) {
        const updateData: UpdateConcessionRequest = {
          name: formData.name,
          nameEn: formData.nameEn || undefined,
          description: formData.description || undefined,
          category: formData.category as ConcessionCategory,
          price: formData.price,
          imageUrl: formData.imageUrl || undefined,
          available: formData.available,
          inventory: formData.inventory,
          cinemaId: formData.cinemaId || undefined,
          allergens: formData.allergens.length > 0 ? formData.allergens : undefined,
        };
        await updateConcession.mutateAsync({ id: editingConcession.id, data: updateData });
      } else {
        const createData: CreateConcessionRequest = {
          name: formData.name,
          nameEn: formData.nameEn || undefined,
          description: formData.description || undefined,
          category: formData.category as ConcessionCategory,
          price: formData.price,
          imageUrl: formData.imageUrl || undefined,
          available: formData.available,
          inventory: formData.inventory,
          cinemaId: formData.cinemaId || undefined,
          allergens: formData.allergens.length > 0 ? formData.allergens : undefined,
        };
        await createConcession.mutateAsync(createData);
      }
      setDialogOpen(false);
      resetForm();
    } catch {
      // Error toast already shown by mutation hooks
    }
  };

  const handleEdit = (concession: Concession) => {
    setEditingConcession(concession);
    setFormData({
      name: concession.name,
      nameEn: concession.nameEn || '',
      description: concession.description || '',
      category: concession.category as string,
      price: concession.price,
      imageUrl: concession.imageUrl || '',
      available: concession.available,
      inventory: concession.inventory || 0,
      cinemaId: concession.cinemaId ? concession.cinemaId : 'all',
      allergens: concession.allergens || [],
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this concession?')) {
      return;
    }

    try {
      await deleteConcession.mutateAsync(id);
    } catch {
      // Error toast already shown by mutation hook
    }
  };

  const resetForm = () => {
    setEditingConcession(null);
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      category: 'FOOD',
      price: 0,
      imageUrl: '',
      available: true,
      inventory: 0,
      cinemaId: 'all',
      allergens: [],
    });
  };

  const getCategoryBadgeColor = (category: ConcessionCategory | string) => {
    switch (category) {
      case 'FOOD':
        return 'bg-orange-100 text-orange-800';
      case 'DRINK':
        return 'bg-blue-100 text-blue-800';
      case 'COMBO':
        return 'bg-purple-100 text-purple-800';
      case 'MERCHANDISE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const stats = {
    total: concessions.length,
    available: concessions.filter((c: Concession) => c.available).length,
    unavailable: concessions.filter((c: Concession) => !c.available).length,
    food: concessions.filter((c: Concession) => String(c.category) === 'FOOD').length,
    drink: concessions.filter((c: Concession) => String(c.category) === 'DRINK').length,
    combo: concessions.filter((c: Concession) => String(c.category) === 'COMBO').length,
    merchandise: concessions.filter((c: Concession) => String(c.category) === 'MERCHANDISE').length,
    totalValue: concessions.reduce((sum: number, c: Concession) => sum + (c.price * (c.inventory || 0)), 0),
    avgPrice: concessions.length > 0 ? concessions.reduce((sum: number, c: Concession) => sum + c.price, 0) / concessions.length : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Concessions Management</h1>
          <p className="text-gray-500 mt-1">Manage food, drinks, and merchandise items</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setDialogOpen(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Concession Item
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.available} available · {stats.unavailable} unavailable
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">By Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.combo}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats.food} food · {stats.drink} drinks · {stats.merchandise} merch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₫{(stats.totalValue / 1000).toFixed(1)}K</div>
            <p className="text-xs text-gray-500 mt-1">
              Total stock value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₫{(stats.avgPrice / 1000).toFixed(1)}K</div>
            <p className="text-xs text-gray-500 mt-1">
              Per item
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
              {(filterCinemaId !== 'all' || filterCategory !== 'all' || filterAvailable !== 'all') && (
                <Badge variant="secondary" className="ml-2">
                  {[filterCinemaId !== 'all', filterCategory !== 'all', filterAvailable !== 'all'].filter(Boolean).length} Active
                </Badge>
              )}
            </CardTitle>
            {(filterCinemaId !== 'all' || filterCategory !== 'all' || filterAvailable !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterCinemaId('all');
                  setFilterCategory('all');
                  setFilterAvailable('all');
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="filter-cinema">Cinema</Label>
              <Select value={filterCinemaId} onValueChange={setFilterCinemaId}>
                <SelectTrigger id="filter-cinema">
                  <SelectValue placeholder="All Cinemas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cinemas</SelectItem>
                  {cinemas.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      {cinema.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-category">Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="filter-category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="filter-availability">Availability</Label>
              <Select value={filterAvailable} onValueChange={setFilterAvailable}>
                <SelectTrigger id="filter-availability">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concessions Grid Cards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Concession Items</h2>
            <p className="text-sm text-gray-600">
              {concessions.length} item{concessions.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading concessions...</p>
          </div>
        ) : concessions.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <ShoppingBag className="h-16 w-16 text-purple-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4 font-medium">No concession items found.</p>
            <Button
              onClick={() => {
                resetForm();
                setDialogOpen(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Item
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {concessions.map((concession: Concession) => {
              const category = CATEGORIES.find((c) => c.value === concession.category);
              const isLowStock = concession.inventory !== undefined && concession.inventory < 10 && concession.inventory > 0;
              const isOutOfStock = concession.inventory === 0;
              
              return (
                <div
                  key={concession.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 via-transparent to-pink-50/0 group-hover:from-purple-50 group-hover:to-pink-50/50 transition-all duration-300 pointer-events-none"></div>

                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {concession.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={concession.imageUrl}
                        alt={concession.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}

                    {/* Stock Status Badge */}
                    <div className="absolute top-2 right-2">
                      {isOutOfStock ? (
                        <div className="bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Out of Stock
                        </div>
                      ) : isLowStock ? (
                        <div className="bg-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Low Stock
                        </div>
                      ) : (
                        <div className="bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
                          In Stock
                        </div>
                      )}
                    </div>

                    {/* Category Badge - Top Left */}
                    <div className="absolute top-2 left-2">
                      <div className={`${getCategoryBadgeColor(concession.category)} px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                        {category?.icon} {category?.label}
                      </div>
                    </div>

                    {/* Availability Indicator */}
                    {!concession.available && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Unavailable</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="relative p-4 space-y-3">
                    {/* Name & English Name */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-base line-clamp-2">{concession.name}</h3>
                      {concession.nameEn && (
                        <p className="text-xs text-gray-500">{concession.nameEn}</p>
                      )}
                    </div>

                    {/* Description */}
                    {concession.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">{concession.description}</p>
                    )}

                    {/* Price Section */}
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ₫{(concession.price / 1000).toFixed(0)}K
                        </span>
                        <span className="text-xs text-gray-500">Price</span>
                      </div>
                    </div>

                    {/* Inventory Bar */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">Stock</span>
                        <span className="text-xs font-bold text-gray-900">
                          {concession.inventory || 0} units
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            concession.inventory === 0
                              ? 'bg-red-500'
                              : concession.inventory && concession.inventory < 10
                                ? 'bg-orange-500'
                                : 'bg-gradient-to-r from-green-400 to-emerald-500'
                          }`}
                          style={{
                            width: `${Math.min((((concession.inventory || 0) / 50) * 100), 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Cinema Info */}
                    <div className="pt-1 text-xs text-gray-600">
                      <span className="font-semibold">
                        {concession.cinemaId
                          ? cinemas.find((c) => c.id === concession.cinemaId)?.name
                          : 'All Cinemas'}
                      </span>
                    </div>

                    {/* Allergens if present */}
                    {concession.allergens && concession.allergens.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {concession.allergens.slice(0, 2).map((allergen, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
                          >
                            ⚠ {allergen}
                          </span>
                        ))}
                        {concession.allergens.length > 2 && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                            +{concession.allergens.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons - Bottom */}
                  <div className="relative px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(concession)}
                      className="flex-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-200"
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(concession.id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingConcession ? 'Edit Concession Item' : 'Add Concession Item'}
            </DialogTitle>
            <DialogDescription>
              {editingConcession ? 'Update concession item information' : 'Add a new concession item to the system'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder="e.g., Popcorn Large"
              />
            </div>

            {/* Name English */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nameEn" className="text-right">
                Name (EN)
              </Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="col-span-3"
                placeholder="Optional English name"
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder="Item description"
                rows={3}
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category *
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Price (₫)"
                  min="0"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Cinema */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cinemaId" className="text-right">
                Cinema
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.cinemaId}
                  onValueChange={(value) => setFormData({ ...formData, cinemaId: value === 'all' ? '' : value })}
                >
                  <SelectTrigger id="cinemaId">
                    <SelectValue placeholder="All cinemas (leave empty)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cinemas</SelectItem>
                    {cinemas.map((cinema) => (
                      <SelectItem key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Leave as &quot;All Cinemas&quot; to make available in all cinemas
                </p>
              </div>
            </div>

            {/* Inventory & Available */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="inventory" className="text-right">
                Inventory
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <Input
                  id="inventory"
                  type="number"
                  value={formData.inventory || ''}
                  onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) || 0 })}
                  placeholder="Stock quantity"
                  min="0"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="available" className="cursor-pointer">
                    Available for sale
                  </Label>
                </div>
              </div>
            </div>

            {/* Allergens */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="allergens" className="text-right">
                Allergens
              </Label>
              <Input
                id="allergens"
                value={formData.allergens.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  allergens: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })}
                className="col-span-3"
                placeholder="e.g., nuts, dairy, gluten (comma separated)"
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
              disabled={createConcession.isPending || updateConcession.isPending || !formData.name.trim() || formData.price < 0}
            >
              {createConcession.isPending || updateConcession.isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
