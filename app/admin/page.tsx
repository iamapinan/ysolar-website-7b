import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { query } from "@/lib/db"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  MessageSquare,
  Calculator,
  TrendingUp,
  Eye,
  Plus,
} from "lucide-react"

export default async function AdminDashboard() {
  const [[svc]]: any = await query("SELECT COUNT(*) cnt FROM services")
  const [[proj]]: any = await query("SELECT COUNT(*) cnt FROM projects")
  const [[art]]: any = await query("SELECT COUNT(*) cnt FROM articles WHERE is_published = 1")
  const [[tm]]: any = await query("SELECT COUNT(*) cnt FROM team_members")
  const [[ct]]: any = await query("SELECT COUNT(*) cnt FROM contacts")
  const [[qr]]: any = await query("SELECT COUNT(*) cnt FROM quote_requests")

  const stats = [
    { title: "Total Services", value: String(svc?.cnt ?? 0), icon: LayoutDashboard, change: "+0%" },
    { title: "Active Projects", value: String(proj?.cnt ?? 0), icon: Briefcase, change: "+0%" },
    { title: "Published Articles", value: String(art?.cnt ?? 0), icon: FileText, change: "+0%" },
    { title: "Team Members", value: String(tm?.cnt ?? 0), icon: Users, change: "+0%" },
    { title: "Contact Forms", value: String(ct?.cnt ?? 0), icon: MessageSquare, change: "+0%" },
    { title: "Quote Requests", value: String(qr?.cnt ?? 0), icon: Calculator, change: "+0%" },
  ]

  const recentActivity = [
    { type: "contact", message: "New contact form submission from John Doe", time: "2 hours ago" },
    { type: "quote", message: "Quote request for 25kW solar system", time: "4 hours ago" },
    { type: "article", message: "Article 'Solar Benefits' was published", time: "1 day ago" },
    { type: "project", message: "Project 'Commercial EV Station' was updated", time: "2 days ago" },
  ]

  const quickActions = [
    { title: "Add New Article", href: "/admin/articles/new", icon: FileText },
    { title: "Add New Project", href: "/admin/projects/new", icon: Briefcase },
    { title: "Add Team Member", href: "/admin/team/new", icon: Users },
    { title: "View Contact Forms", href: "/admin/contacts", icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your website.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Quick Add
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="w-full justify-start bg-transparent" asChild>
                <a href={action.href}>
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.title}
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Latest Articles
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/articles">
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Benefits of Solar Energy", status: "published", views: 1250 },
              { title: "EV Charging Guide", status: "draft", views: 0 },
              { title: "Maintenance Tips", status: "published", views: 890 },
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                    <span className="text-xs text-muted-foreground">{article.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Projects
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/projects">
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Residential Solar 10kW", type: "Solar", status: "completed" },
              { title: "Commercial EV Station", type: "EV Charger", status: "in-progress" },
              { title: "Industrial Solar 500kW", type: "Solar", status: "completed" },
            ].map((project, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium text-foreground">{project.title}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{project.type}</Badge>
                  <Badge variant={project.status === "completed" ? "default" : "secondary"}>{project.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pending Requests
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/contacts">
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: "Quote Request", name: "Sarah Johnson", service: "Solar 15kW" },
              { type: "Contact Form", name: "Mike Chen", service: "EV Charger" },
              { type: "Quote Request", name: "David Lee", service: "Maintenance" },
            ].map((request, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{request.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {request.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{request.service}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
