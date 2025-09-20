"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Zap, Sun, Home } from "lucide-react"

interface CalculationResult {
  recommendedWatt: number
  estimatedPanels: number
  monthlySavings: number
  paybackPeriod: number
}

export default function WattCalculator() {
  const [formData, setFormData] = useState({
    monthlyBill: "",
    roofArea: "",
    roofType: "",
    location: "",
    usagePattern: ""
  })
  
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateWattage = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay
    setTimeout(() => {
      const monthlyBill = parseFloat(formData.monthlyBill) || 0
      const roofArea = parseFloat(formData.roofArea) || 0
      
      // Basic calculation logic
      // Average electricity cost in Thailand: ~4.5 THB/kWh
      const avgCostPerKwh = 4.5
      const monthlyKwh = monthlyBill / avgCostPerKwh
      const dailyKwh = monthlyKwh / 30
      
      // Solar panel efficiency and sun hours (Thailand average: 5-6 hours)
      const sunHours = 5.5
      const panelEfficiency = 0.85
      const recommendedWatt = Math.ceil((dailyKwh * 1000) / (sunHours * panelEfficiency))
      
      // Panel size: 2m² per 400W panel
      const panelSize = 2
      const maxPanelsByArea = Math.floor(roofArea / panelSize)
      const estimatedPanels = Math.min(Math.ceil(recommendedWatt / 400), maxPanelsByArea)
      
      // Calculate savings (70% reduction)
      const monthlySavings = monthlyBill * 0.7
      
      // Payback period (assuming 50,000 THB per kW)
      const systemCost = (recommendedWatt / 1000) * 50000
      const paybackPeriod = Math.ceil(systemCost / (monthlySavings * 12))
      
      setResult({
        recommendedWatt: Math.min(recommendedWatt, maxPanelsByArea * 400),
        estimatedPanels,
        monthlySavings: Math.round(monthlySavings),
        paybackPeriod
      })
      
      setIsCalculating(false)
    }, 1500)
  }

  const resetCalculator = () => {
    setFormData({
      monthlyBill: "",
      roofArea: "",
      roofType: "",
      location: "",
      usagePattern: ""
    })
    setResult(null)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            คำนวณกำลังไฟฟ้าที่ต้องใช้
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ระบบคำนวณขนาดระบบโซลาร์เซลล์ที่เหมาะสมกับบ้านของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                ข้อมูลการคำนวณ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyBill">ค่าไฟรายเดือน (บาท)</Label>
                <Input
                  id="monthlyBill"
                  type="number"
                  placeholder="เช่น 3000"
                  value={formData.monthlyBill}
                  onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofArea">พื้นที่หลังคา (ตารางเมตร)</Label>
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="เช่น 100"
                  value={formData.roofArea}
                  onChange={(e) => handleInputChange("roofArea", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofType">ประเภทหลังคา</Label>
                <Select value={formData.roofType} onValueChange={(value) => handleInputChange("roofType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทหลังคา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tile">กระเบื้อง</SelectItem>
                    <SelectItem value="metal">เหล็ก</SelectItem>
                    <SelectItem value="concrete">คอนกรีต</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">ภูมิภาค</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกภูมิภาค" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangkok">กรุงเทพฯ</SelectItem>
                    <SelectItem value="central">ภาคกลาง</SelectItem>
                    <SelectItem value="north">ภาคเหนือ</SelectItem>
                    <SelectItem value="northeast">ภาคอีสาน</SelectItem>
                    <SelectItem value="south">ภาคใต้</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usagePattern">รูปแบบการใช้งาน</Label>
                <Select value={formData.usagePattern} onValueChange={(value) => handleInputChange("usagePattern", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกรูปแบบการใช้งาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">ใช้งานปกติ</SelectItem>
                    <SelectItem value="high">ใช้งานมาก</SelectItem>
                    <SelectItem value="low">ใช้งานน้อย</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={calculateWattage} 
                  disabled={isCalculating || !formData.monthlyBill || !formData.roofArea}
                  className="flex-1"
                >
                  {isCalculating ? "กำลังคำนวณ..." : "คำนวณ"}
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  รีเซ็ต
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Sun className="w-6 h-6" />
                      ผลการคำนวณ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{result.recommendedWatt.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">วัตต์</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <div className="text-2xl font-bold text-secondary">{result.estimatedPanels}</div>
                        <div className="text-sm text-muted-foreground">แผง</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">ประหยัดค่าไฟต่อเดือน</span>
                        <span className="text-green-600 font-bold">{result.monthlySavings.toLocaleString()} บาท</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">ระยะเวลาคืนทุน</span>
                        <span className="text-blue-600 font-bold">{result.paybackPeriod} ปี</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-orange-500" />
                      แพ็คเกจแนะนำ
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.recommendedWatt <= 3000 && (
                        <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-primary">แพ็คเกจ Silver</h4>
                            <span className="text-sm text-muted-foreground">3,000 วัตต์</span>
                          </div>
                          <p className="text-sm text-muted-foreground">เหมาะสำหรับบ้านขนาดเล็ก</p>
                        </div>
                      )}
                      
                      {result.recommendedWatt > 3000 && result.recommendedWatt <= 6000 && (
                        <div className="p-4 border-2 border-orange-500 rounded-lg bg-orange-50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-orange-700">แพ็คเกจ Gold</h4>
                            <span className="text-sm text-muted-foreground">6,000 วัตต์</span>
                          </div>
                          <p className="text-sm text-muted-foreground">เหมาะสำหรับบ้านขนาดกลาง</p>
                        </div>
                      )}
                      
                      {result.recommendedWatt > 6000 && (
                        <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-purple-700">แพ็คเกจ Platinum</h4>
                            <span className="text-sm text-muted-foreground">10,000+ วัตต์</span>
                          </div>
                          <p className="text-sm text-muted-foreground">เหมาะสำหรับบ้านขนาดใหญ่</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">กรอกข้อมูลเพื่อคำนวณ</h3>
                  <p className="text-muted-foreground">
                    ระบบจะคำนวณขนาดระบบโซลาร์เซลล์ที่เหมาะสมกับบ้านของคุณ
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
