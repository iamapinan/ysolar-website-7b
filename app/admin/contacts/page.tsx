import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, Building, Calendar, Eye, Trash2 } from "lucide-react"

export default function AdminContactsPage() {
  const contacts = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+66-81-234-5678",
      company: "ABC Corporation",
      serviceInterest: "solar",
      message: "Interested in 50kW solar installation for our office building. Please provide quote and timeline.",
      isRead: false,
      createdAt: "2024-01-20T10:30:00Z",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      phone: "+66-82-345-6789",
      company: "Tech Startup Ltd",
      serviceInterest: "ev_charger",
      message: "Looking for EV charging solution for our parking lot. Need 6 charging ports.",
      isRead: true,
      createdAt: "2024-01-19T14:15:00Z",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@gmail.com",
      phone: "+66-83-456-7890",
      company: null,
      serviceInterest: "maintenance",
      message: "Need maintenance service for existing solar panels. System is 2 years old.",
      isRead: false,
      createdAt: "2024-01-18T09:45:00Z",
    },
    {
      id: 4,
      name: "Lisa Wong",
      email: "lisa.wong@business.co.th",
      phone: "+66-84-567-8901",
      company: "Green Business Co.",
      serviceInterest: "consultation",
      message: "Would like consultation on transitioning to renewable energy for our manufacturing facility.",
      isRead: true,
      createdAt: "2024-01-17T16:20:00Z",
    },
  ]

  const getServiceBadgeColor = (service: string) => {
    switch (service) {
      case "solar":
        return "default"
      case "ev_charger":
        return "secondary"
      case "maintenance":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatServiceName = (service: string) => {
    switch (service) {
      case "solar":
        return "Solar"
      case "ev_charger":
        return "EV Charger"
      case "maintenance":
        return "Maintenance"
      case "consultation":
        return "Consultation"
      default:
        return service
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Forms</h1>
          <p className="text-muted-foreground">Manage customer inquiries and contact submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search contacts..." className="pl-10 w-64" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">45</div>
            <div className="text-sm text-muted-foreground">Total Contacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">33</div>
            <div className="text-sm text-muted-foreground">Read</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">8</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className={`${!contact.isRead ? "border-primary/50 bg-primary/5" : ""}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    {!contact.isRead && (
                      <Badge variant="destructive" className="text-xs">
                        New
                      </Badge>
                    )}
                    <Badge variant={getServiceBadgeColor(contact.serviceInterest)}>
                      {formatServiceName(contact.serviceInterest)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phone}</span>
                    </div>
                    {contact.company && (
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{contact.company}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Message:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{contact.message}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Submitted {new Date(contact.createdAt).toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
