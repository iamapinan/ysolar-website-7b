import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Calendar, MapPin } from "lucide-react"

export default function AdminProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Residential Solar Installation",
      titleTh: "ติดตั้งโซลาร์บ้านพักอาศัย",
      client: "Private Residence",
      location: "Bangkok",
      type: "Solar Rooftop",
      capacity: "10kW",
      completionDate: "2024-01-15",
      costSavings: 30,
      isFeatured: true,
      isActive: true,
      image: "/residential-solar-project.png",
    },
    {
      id: 2,
      title: "Commercial EV Charging Station",
      titleTh: "สถานีชาร์จรถยนต์ไฟฟ้าเชิงพาณิชย์",
      client: "Office Complex",
      location: "Chonburi",
      type: "EV Charger",
      capacity: "4 Ports",
      completionDate: "2024-02-20",
      costSavings: null,
      isFeatured: true,
      isActive: true,
      image: "/commercial-ev-project.png",
    },
    {
      id: 3,
      title: "Industrial Solar Farm",
      titleTh: "โซลาร์ฟาร์มอุตสาหกรรม",
      client: "Manufacturing Plant",
      location: "Rayong",
      type: "Solar Rooftop",
      capacity: "500kW",
      completionDate: "2024-03-10",
      costSavings: 45,
      isFeatured: true,
      isActive: true,
      image: "/industrial-solar-project.png",
    },
    {
      id: 4,
      title: "Hybrid Solar + EV System",
      titleTh: "ระบบโซลาร์ + EV แบบผสม",
      client: "Eco Resort",
      location: "Phuket",
      type: "Solar + EV",
      capacity: "25kW + 2 Ports",
      completionDate: "2024-04-05",
      costSavings: 35,
      isFeatured: false,
      isActive: true,
      image: "/hybrid-project.png",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects Management</h1>
          <p className="text-muted-foreground">Manage your portfolio and case studies</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary">{project.type}</Badge>
                {project.isFeatured && <Badge variant="default">Featured</Badge>}
              </div>
              <div className="absolute top-4 right-4 flex gap-1">
                <Button variant="secondary" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {project.costSavings && (
                <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                  -{project.costSavings}%
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{project.titleTh}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{project.capacity}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant={project.isActive ? "default" : "secondary"}>
                  {project.isActive ? "Active" : "Inactive"}
                </Badge>
                <span className="text-sm text-muted-foreground">ID: {project.id}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Project Card */}
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Add New Project</h3>
            <p className="text-muted-foreground">Showcase your latest work and case studies</p>
          </div>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
