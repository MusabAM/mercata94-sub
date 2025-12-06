import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { mockSettings } from "@/data/mockAdminData";
import { toast } from "@/hooks/use-toast";
import { Save, History } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState(mockSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AdminLayout title="Settings" subtitle="Configure platform settings">
      <div className="max-w-2xl space-y-8">
        {/* Commission Settings */}
        <div className="glass-card p-6 bg-midnight-light/30">
          <h2 className="font-serif text-lg text-cream mb-4">Commission Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="commission" className="text-cream/80">Platform Commission (%)</Label>
              <div className="flex items-center gap-4 mt-2">
                <Input
                  id="commission"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.platformCommission * 100}
                  onChange={(e) =>
                    setSettings({ ...settings, platformCommission: parseFloat(e.target.value) / 100 })
                  }
                  className="w-32 bg-midnight border-sapphire/20 text-cream"
                />
                <span className="text-cream/50 text-sm">
                  Current: {(settings.platformCommission * 100).toFixed(1)}% of each sale
                </span>
              </div>
              <p className="text-xs text-cream/40 mt-2">
                This fee is deducted from seller earnings on each transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Site Settings */}
        <div className="glass-card p-6 bg-midnight-light/30">
          <h2 className="font-serif text-lg text-cream mb-4">Site Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteTitle" className="text-cream/80">Site Title</Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                className="mt-2 bg-midnight border-sapphire/20 text-cream"
              />
            </div>
            <div>
              <Label htmlFor="collections" className="text-cream/80">Featured Collections</Label>
              <Input
                id="collections"
                value={settings.featuredCollections.join(", ")}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    featuredCollections: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                className="mt-2 bg-midnight border-sapphire/20 text-cream"
                placeholder="UI Kits, Templates, Icons"
              />
              <p className="text-xs text-cream/40 mt-1">Comma-separated list of collection names</p>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="glass-card p-6 bg-midnight-light/30">
          <h2 className="font-serif text-lg text-cream mb-4">Feature Toggles</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cream font-medium">Maintenance Mode</p>
                <p className="text-sm text-cream/50">Temporarily disable the site for users</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cream font-medium">Allow New Signups</p>
                <p className="text-sm text-cream/50">Enable or disable new user registration</p>
              </div>
              <Switch
                checked={settings.allowNewSignups}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowNewSignups: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cream font-medium">Require Email Verification</p>
                <p className="text-sm text-cream/50">Users must verify email before full access</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireEmailVerification: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button variant="sapphire" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" className="border-sapphire/30 text-cream hover:bg-sapphire/20">
            <History className="h-4 w-4 mr-2" />
            View History
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
