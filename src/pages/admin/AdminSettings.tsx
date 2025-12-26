import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import {
  Save,
  Loader2,
  History,
  Percent,
} from "lucide-react";

interface Setting {
  value: string;
  description: string;
  updated_at: string;
}

interface SettingsData {
  [key: string]: Setting;
}

interface AuditLogEntry {
  setting_key: string;
  old_value: string;
  new_value: string;
  admin_email: string;
  changed_at: string;
}

const settingLabels: Record<string, string> = {
  platform_fee_percent: "Platform Commission",
  min_payout_amount: "Minimum Payout Amount",
  payout_processing_days: "Payout Processing Days",
};

const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingsData>({});
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);

  // Mock site settings
  const [siteTitle, setSiteTitle] = useState("94mercato");
  const [featuredCollections, setFeaturedCollections] = useState("UI Kits, Templates, Icons");

  // Mock feature toggles
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowSignups, setAllowSignups] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);

  // Fetch settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/settings');
        setSettings(response.data.settings);

        // Initialize edited values with current values
        const initialValues: Record<string, string> = {};
        Object.keys(response.data.settings).forEach(key => {
          initialValues[key] = response.data.settings[key].value;
        });
        setEditedValues(initialValues);
      } catch (err: any) {
        console.error('Error fetching settings:', err);
        toast({
          title: "Error",
          description: err.response?.data?.message || "Failed to load settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Fetch audit log
  const fetchAuditLog = async () => {
    try {
      const response = await api.get('/admin/settings/audit-log');
      setAuditLog(response.data.audit_log);
      setShowAuditLog(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to load audit log.",
        variant: "destructive",
      });
    }
  };

  // Save all changes
  const handleSaveAll = async () => {
    setIsSaving(true);
    let hasChanges = false;

    try {
      // Save platform_fee_percent if changed
      const feeKey = 'platform_fee_percent';
      if (settings[feeKey] && editedValues[feeKey] !== settings[feeKey].value) {
        await api.put(`/admin/settings/${feeKey}`, { value: editedValues[feeKey] });
        hasChanges = true;
        setSettings(prev => ({
          ...prev,
          [feeKey]: {
            ...prev[feeKey],
            value: editedValues[feeKey],
            updated_at: new Date().toISOString()
          }
        }));
      }

      if (hasChanges) {
        toast({
          title: "Success",
          description: "Settings saved successfully.",
        });
      } else {
        toast({
          title: "No Changes",
          description: "No settings were changed.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const commissionSetting = settings['platform_fee_percent'];
  const commissionValue = editedValues['platform_fee_percent'] || '';

  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-cream">Settings</h1>
          <p className="text-cream/50">Configure platform settings</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-champagne" />
          </div>
        ) : (
          <>
            {/* Commission Settings */}
            <div className="glass-card p-6 bg-midnight-light/30">
              <h2 className="text-lg font-semibold text-cream mb-4">Commission Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-cream/70 mb-2 block">Platform Commission (%)</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={commissionValue}
                      onChange={(e) => setEditedValues(prev => ({
                        ...prev,
                        platform_fee_percent: e.target.value
                      }))}
                      className="w-24 bg-midnight border-sapphire/30 text-cream"
                    />
                    <span className="text-cream/50 text-sm">
                      Current: {commissionValue}.0% of each sale
                    </span>
                  </div>
                  <p className="text-xs text-cream/40 mt-2">
                    This fee is deducted from seller earnings on each transaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Site Settings (Mock) */}
            <div className="glass-card p-6 bg-midnight-light/30">
              <h2 className="text-lg font-semibold text-cream mb-4">Site Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-cream/70 mb-2 block">Site Title</label>
                  <Input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="w-full max-w-md bg-midnight border-sapphire/30 text-cream"
                  />
                </div>
                <div>
                  <label className="text-sm text-cream/70 mb-2 block">Featured Collections</label>
                  <Input
                    type="text"
                    value={featuredCollections}
                    onChange={(e) => setFeaturedCollections(e.target.value)}
                    className="w-full max-w-md bg-midnight border-sapphire/30 text-cream"
                  />
                  <p className="text-xs text-cream/40 mt-1">
                    Comma-separated list of collection names
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Toggles (Mock) */}
            <div className="glass-card p-6 bg-midnight-light/30">
              <h2 className="text-lg font-semibold text-cream mb-4">Feature Toggles</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium">Maintenance Mode</p>
                    <p className="text-xs text-cream/50">Temporarily disable the site for users</p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium">Allow New Signups</p>
                    <p className="text-xs text-cream/50">Enable or disable new user registration</p>
                  </div>
                  <Switch
                    checked={allowSignups}
                    onCheckedChange={setAllowSignups}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cream font-medium">Require Email Verification</p>
                    <p className="text-xs text-cream/50">Users must verify email before full access</p>
                  </div>
                  <Switch
                    checked={requireEmailVerification}
                    onCheckedChange={setRequireEmailVerification}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="bg-sapphire hover:bg-sapphire/80 text-cream"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={fetchAuditLog}
                className="text-cream border-sapphire/30 hover:bg-sapphire/10"
              >
                <History className="h-4 w-4 mr-2" />
                View History
              </Button>
            </div>
          </>
        )}

        {/* Audit Log Modal */}
        {showAuditLog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-midnight border border-sapphire/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-cream">Settings Audit Log</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuditLog(false)}
                  className="text-cream"
                >
                  Close
                </Button>
              </div>

              {auditLog.length === 0 ? (
                <p className="text-cream/50 text-center py-8">No changes recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {auditLog.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-midnight-light/30 border border-sapphire/10 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-sapphire border-sapphire/30">
                          {settingLabels[entry.setting_key] || entry.setting_key}
                        </Badge>
                        <span className="text-xs text-cream/50">
                          {formatDate(entry.changed_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-rose-400">{entry.old_value || 'null'}</span>
                        <span className="text-cream/30">→</span>
                        <span className="text-emerald-400">{entry.new_value}</span>
                      </div>
                      <p className="text-xs text-cream/50 mt-2">
                        Changed by: {entry.admin_email}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
