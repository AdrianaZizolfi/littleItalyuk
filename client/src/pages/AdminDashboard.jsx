
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  Mail,
  Settings,
  Eye,
  Calendar,
  TrendingUp,
  Globe,
  Layout
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // You'll handle this with your auth
    
    // API state management
    const [dashboardStats, setDashboardStats] = useState({
      totalContactSubmissions: 0,
      totalPages: 0,
      totalSections: 0,
      monthlyViews: 0
    });
  
    const [contactSubmissions, setContactSubmissions] = useState([]);
    const [pages, setPages] = useState([]);
    const [sections, setSections] = useState([]);
    const [siteSettings, setSiteSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // API helper function
    const apiCall = async (endpoint, options = {}) => {
        try {
        //   const response = await fetch(`/api/${endpoint}`, {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       ...options.headers
        //     },
        //     credentials: 'include', // ✅ needed for session-based login
        //     ...options
        //   });

        const response = await fetch(`http://localhost:8001/api/${endpoint}`, {
            headers: {
              'Content-Type': 'application/json',
              ...options.headers
            },
            credentials: 'include',
            ...options
          });
          
      
          const contentType = response.headers.get('content-type');
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
      
          if (contentType && contentType.includes('application/json')) {
            return await response.json();
          } else {
            const text = await response.text();
            throw new Error(`Expected JSON, got: ${text.slice(0, 100)}`);
          }
        } catch (err) {
          setError(err.message);
          throw err;
        }
      };
      
  
    // Load all data on component mount
    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          
          // Check authentication
          const authCheck = await apiCall('auth/check/');
          if (!authCheck.authenticated) {
            setIsAuthenticated(false);
            return;
          }
  
          // Load dashboard data
          const dashboardData = await apiCall('dashboard/stats/');
          setDashboardStats(dashboardData);
  
          // Load contact submissions
          const submissions = await apiCall('contact-submissions/');
          setContactSubmissions(submissions.results || submissions);
  
          // Load pages
          const pagesData = await apiCall('pages/');
          setPages(pagesData.results || pagesData);
  
          // Load sections
          const sectionsData = await apiCall('sections/');
          setSections(sectionsData.results || sectionsData);
  
          // Load site settings
          const settings = await apiCall('site-settings/');
          setSiteSettings(settings.results?.[0] || settings);
  
        } catch (err) {
          console.error('Error loading data:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'contact', label: 'Contact Submissions', icon: Mail },
        { id: 'pages', label: 'Pages & Content', icon: FileText },
        { id: 'settings', label: 'Site Settings', icon: Settings },
      ];
    
      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };
    
      const handleMarkAsRead = async (submissionId) => {
        try {
          await apiCall(`contact-submissions/${submissionId}/`, {
            method: 'PATCH',
            body: JSON.stringify({ is_read: true })
          });
          
          setContactSubmissions(prev => 
            prev.map(sub => 
              sub.id === submissionId ? { ...sub, is_read: true } : sub
            )
          );
        } catch (err) {
          console.error('Error marking submission as read:', err);
        }
      };
    
      const handleDeleteSubmission = async (submissionId) => {
        try {
          await apiCall(`contact-submissions/${submissionId}/`, {
            method: 'DELETE'
          });
          
          setContactSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
        } catch (err) {
          console.error('Error deleting submission:', err);
        }
      };
    
      const handleDeletePage = async (pageId) => {
        try {
          await apiCall(`pages/${pageId}/`, {
            method: 'DELETE'
          });
          
          setPages(prev => prev.filter(page => page.id !== pageId));
        } catch (err) {
          console.error('Error deleting page:', err);
        }
      };

      const handleTogglePageStatus = async (pageId) => {
        try {
          const page = pages.find(p => p.id === pageId);
          await apiCall(`pages/${pageId}/`, {
            method: 'PATCH',
            body: JSON.stringify({ is_published: !page.is_published })
          });
          
          setPages(prev => 
            prev.map(page => 
              page.id === pageId ? { ...page, is_published: !page.is_published } : page
            )
          );
        } catch (err) {
          console.error('Error updating page status:', err);
        }
      };
    
      const handleSaveSettings = async (settingsData) => {
        try {
          const method = siteSettings.id ? 'PUT' : 'POST';
          const endpoint = siteSettings.id ? `site-settings/${siteSettings.id}/` : 'site-settings/';
          
          const updatedSettings = await apiCall(endpoint, {
            method,
            body: JSON.stringify(settingsData)
          });
          
          setSiteSettings(updatedSettings);
          alert('Settings saved successfully!');
        } catch (err) {
          console.error('Error saving settings:', err);
          alert('Error saving settings');
        }
      };

      const handleLogout = async () => {
        try {
          await apiCall('auth/logout/', { method: 'POST' });
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        } catch (err) {
          console.error('Error logging out:', err);
        }
      };

      const DashboardView = () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Contact Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalContactSubmissions}</p>
                  <p className="text-sm text-green-600">+3 this week</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published Pages</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalPages}</p>
                  <p className="text-sm text-green-600">+1 this month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Content Sections</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalSections}</p>
                  <p className="text-sm text-green-600">+5 this month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                        {dashboardStats.monthlyViews != null
                        ? dashboardStats.monthlyViews.toLocaleString()
                        : '0'}
                    </p>
                  <p className="text-sm text-green-600">+12% vs last month</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Contact Submissions</h3>
              <div className="space-y-3">
                {contactSubmissions.slice(0, 3).map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{submission.name}</p>
                        {!submission.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{submission.subject}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(submission.created_at)}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('contact')}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Submissions
              </button>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('pages')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit Page Content
                </button>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Review Contact Messages
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Update Site Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      const ContactSubmissionsView = () => (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Contact Submissions</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {contactSubmissions.filter(sub => !sub.is_read).length} unread
              </span>
            </div>
          </div>
    
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {contactSubmissions.map((submission) => (
                <div key={submission.id} className={`p-6 hover:bg-gray-50 ${!submission.is_read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                        {!submission.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                      <p className="text-sm font-medium text-gray-800 mb-2">{submission.subject}</p>
                      <p className="text-sm text-gray-600 mb-3">{submission.message}</p>
                      <p className="text-xs text-gray-500">{formatDate(submission.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!submission.is_read && (
                        <button 
                          onClick={() => handleMarkAsRead(submission.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteSubmission(submission.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    

      const PagesView = () => (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Pages & Content</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Plus size={20} />
              Create Page
            </button>
          </div>
    
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search pages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-500">/{page.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePageStatus(page.id)}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            page.is_published 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {page.is_published ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sections.filter(s => s.page === page.id).length} sections
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(page.updated_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeletePage(page.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

      const SettingsView = () => (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Site Settings</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={siteSettings.site_name || ''}
                    onChange={(e) => setSiteSettings({...siteSettings, site_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    value={siteSettings.site_description || ''}
                    onChange={(e) => setSiteSettings({...siteSettings, site_description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={() => handleSaveSettings({
                    site_name: siteSettings.site_name,
                    site_description: siteSettings.site_description
                  })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save General Settings
                </button>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={siteSettings.contact_email || ''}
                    onChange={(e) => setSiteSettings({...siteSettings, contact_email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={siteSettings.phone || ''}
                    onChange={(e) => setSiteSettings({...siteSettings, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={siteSettings.address || ''}
                    onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={() => handleSaveSettings({
                    contact_email: siteSettings.contact_email,
                    phone: siteSettings.phone,
                    address: siteSettings.address
                  })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Contact Info
                </button>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    type="url"
                    value={siteSettings.social_media?.facebook || ''}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      social_media: {...(siteSettings.social_media || {}), facebook: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={siteSettings.social_media?.twitter || ''}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      social_media: {...(siteSettings.social_media || {}), twitter: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={siteSettings.social_media?.linkedin || ''}
                    onChange={(e) => setSiteSettings({
                      ...siteSettings, 
                      social_media: {...(siteSettings.social_media || {}), linkedin: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  onClick={() => handleSaveSettings({
                    social_media: siteSettings.social_media
                  })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Save Social Media
                </button>
              </div>
            </div>
    
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      );

  // Add loading and error states
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Admin Login Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
          <button 
            onClick={() => window.location.href = '/admin/login'}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ FIX: Define renderContent
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'contact':
        return <ContactSubmissionsView />;
      case 'pages':
        return <PagesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
                {item.id === 'contact' && contactSubmissions.filter(sub => !sub.is_read).length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {contactSubmissions.filter(sub => !sub.is_read).length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab === 'contact' ? 'Contact Submissions' : 
                 activeTab === 'pages' ? 'Pages & Content' : 
                 activeTab === 'settings' ? 'Site Settings' : 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800 relative">
                <Bell size={20} />
                {contactSubmissions.filter(sub => !sub.is_read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {contactSubmissions.filter(sub => !sub.is_read).length}
                  </span>
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;