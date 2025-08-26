import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Sun, Zap, Wrench } from "lucide-react"

export default function AdminServicesPage() {
  const services = [
    {
      id: 1,
      title: "Solar Rooftop Solutions",
      titleTh: "ระบบโซลาร์รูฟท็อป",
      category: "solar",
      icon: Sun,
      description: "Complete solar rooftop design and installation services with international standard equipment",
      isFeatured: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      title: "EV Charger Systems",
      titleTh: "ระบบชาร์จรถยนต์ไฟฟ้า",
      category: "ev_charger",
      icon: Zap,
      description: "EV charger installation and electrical system upgrades for all vehicle types",
      isFeatured: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      title: "Maintenance & After Sales",
      titleTh: "บริการซ่อมบำรุงหลังการขาย",
      category: "maintenance",
      icon: Wrench,
      description: "Regular maintenance and health checks for solar systems and EV chargers",
      isFeatured: true,
      isActive: true,
      sortOrder: 3,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Services Management</h1>
          <p className="text-muted-foreground">Manage your company services and offerings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{service.titleTh}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Active" : "Inactive"}
                </Badge>
                {service.isFeatured && <Badge variant="outline">Featured</Badge>}
                <Badge variant="outline" className="capitalize">
                  {service.category.replace("_", " ")}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Sort Order: {service.sortOrder}</span>
                <span>ID: {service.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Service Card */}
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Add New Service</h3>
            <p className="text-muted-foreground">Create a new service offering for your website</p>
          </div>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Service
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
