"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Heart,
  MessageCircle,
  Share,
  Settings,
  User,
} from "lucide-react";

export function ComponentsShowcaseSection() {
  return (
    <section id="components" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Components
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Complete <span className="text-primary">Component Library</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Every component automatically adapts to your theme. See how buttons,
            cards, forms, and more transform seamlessly.
          </p>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Primary Buttons</CardTitle>
                  <CardDescription>
                    Main action buttons with theme colors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">Primary Button</Button>
                  <Button variant="secondary" className="w-full">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Outline Button
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Button Sizes</CardTitle>
                  <CardDescription>
                    Different sizes for various use cases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button size="sm" className="w-full">
                    Small Button
                  </Button>
                  <Button size="default" className="w-full">
                    Default Button
                  </Button>
                  <Button size="lg" className="w-full">
                    Large Button
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Icon Buttons</CardTitle>
                  <CardDescription>
                    Buttons with icons and actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Star className="mr-2 h-4 w-4" />
                    Favorite
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cards" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">User Profile</CardTitle>
                  </div>
                  <CardDescription>
                    Theme-adaptive user information card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">John Doe</div>
                      <div className="text-sm text-muted-foreground">
                        Designer
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statistics Card</CardTitle>
                  <CardDescription>
                    Progress and metrics display
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">42</div>
                      <div className="text-xs text-muted-foreground">
                        Projects
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">98%</div>
                      <div className="text-xs text-muted-foreground">
                        Success
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Card</CardTitle>
                  <CardDescription>
                    Interactive social media style card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Just launched our new theme system! The automatic color
                    adaptation is incredible. 🎨
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        24
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />8
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forms" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Form</CardTitle>
                  <CardDescription>
                    Theme-adaptive form elements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      placeholder="Your message"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Settings Form</CardTitle>
                  <CardDescription>
                    Various input types and controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Email Notifications
                    </label>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Theme Preference
                    </label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option>Auto</option>
                      <option>Light</option>
                      <option>Dark</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Update Frequency
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="w-full accent-primary"
                    />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation Bar</CardTitle>
                  <CardDescription>
                    Responsive navigation with theme colors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-primary">Brand</div>
                      <div className="hidden md:flex space-x-4">
                        <a
                          href="#"
                          className="text-foreground hover:text-primary"
                        >
                          Home
                        </a>
                        <a
                          href="#"
                          className="text-foreground hover:text-primary"
                        >
                          About
                        </a>
                        <a
                          href="#"
                          className="text-foreground hover:text-primary"
                        >
                          Services
                        </a>
                        <a
                          href="#"
                          className="text-foreground hover:text-primary"
                        >
                          Contact
                        </a>
                      </div>
                      <Button size="sm">Get Started</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Breadcrumbs</CardTitle>
                  <CardDescription>
                    Navigation breadcrumbs with theme styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Home
                    </a>
                    <span className="text-muted-foreground">/</span>
                    <a href="#" className="text-primary hover:underline">
                      Components
                    </a>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground">Navigation</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
