import React, { useState, useMemo } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Avatar,
    TextField,
    InputAdornment,
    Divider,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Switch,
    FormControlLabel,
    Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const drawerWidth = 260;
const LogoText = styled(Typography)({
    fontWeight: 600,
    fontSize: "1.4rem",
    color: "rgba(0, 42, 209, 0.9)",
});
const SoftCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 20,
    backgroundColor: '#fff',
    boxShadow: '0 6px 30px rgba(14,20,30,0.06)',
}));

const smallSoft = { borderRadius: 14, padding: 12 };

// --- Sample Data ---
const sampleUsers = [
    { id: 1, name: 'Armin A.', email: 'armin@example.com', role: 'admin', status: 'active', plan: 'premium' },
    { id: 2, name: 'Mikasa A.', email: 'mikasa@example.com', role: 'manager', status: 'active', plan: 'standard' },
    { id: 3, name: 'Eren Y.', email: 'eren@example.com', role: 'user', status: 'suspended', plan: 'free' },
];

const sampleMeetings = [
    { id: 'm-001', host: 'Armin A.', title: 'Math tutoring', participants: 3, duration: 42, date: '2025-08-09' },
    { id: 'm-002', host: 'Mikasa A.', title: 'Project sync', participants: 6, duration: 25, date: '2025-08-07' },
];

const sampleRecordings = [
    { id: 'r-001', meetingId: 'm-001', name: 'math_tutoring_2025-08-09.mp4', size: '18MB' },
    { id: 'r-002', meetingId: 'm-002', name: 'project_sync_2025-08-07.mp4', size: '24MB' },
];

const sampleTranscripts = [
    { id: 't-001', meetingId: 'm-001', snippet: 'Today we discussed quadratic equations...' },
    { id: 't-002', meetingId: 'm-002', snippet: 'Sprint planning for week 32...' },
];

export default function ModernAdminDashboardFull() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [page, setPage] = useState('dashboard');

    // state for domain features
    const [users, setUsers] = useState(sampleUsers);
    const [meetings] = useState(sampleMeetings);
    const [recordings, setRecordings] = useState(sampleRecordings);
    const [transcripts] = useState(sampleTranscripts);

    // account creation dialog
    const [createOpen, setCreateOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', plan: 'free' });

    // permissions per role (simple)
    const [permissions, setPermissions] = useState({
        admin: { chat: true, video: true, recording: true, transcripts: true },
        manager: { chat: true, video: true, recording: true, transcripts: false },
        user: { chat: true, video: true, recording: false, transcripts: false },
    });

    const handleDrawerToggle = () => setMobileOpen((s) => !s);

    const menuItems = [
        { key: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
        { key: 'accounts', text: 'Accounts', icon: <GroupIcon /> },
        { key: 'permissions', text: 'Permissions', icon: <SettingsIcon /> },
        { key: 'meetings', text: 'Meetings', icon: <InsertChartIcon /> },
        { key: 'recordings', text: 'Recordings', icon: <FolderIcon /> },
        { key: 'transcripts', text: 'Transcripts', icon: <DescriptionIcon /> },
        { key: 'usage', text: 'Usage Stats', icon: <BarChartIcon /> },
        { key: 'billing', text: 'Billing', icon: <PaymentIcon /> },
        { key: 'support', text: 'Support', icon: <HelpOutlineIcon /> },
    ];

    // --- Accounts actions ---
    const openCreate = () => setCreateOpen(true);
    const closeCreate = () => setCreateOpen(false);
    const createAccount = () => {
        if (!newUser.name || !newUser.email) return;
        const next = { id: users.length + 1, ...newUser, status: 'active' };
        setUsers((u) => [...u, next]);
        setNewUser({ name: '', email: '', role: 'user', plan: 'free' });
        closeCreate();
    };

    const toggleUserStatus = (id) => {
        setUsers((u) => u.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'suspended' : 'active' } : x));
    };

    const deleteUser = (id) => setUsers((u) => u.filter(x => x.id !== id));

    // --- Recordings actions ---
    const downloadRecording = (rec) => {
        // placeholder - integrate with backend file-serving
        alert(`Download ${rec.name}`);
    };
    const removeRecording = (id) => setRecordings((r) => r.filter(x => x.id !== id));

    // --- Permissions editor ---
    const togglePermission = (role, feature) => {
        setPermissions((p) => ({ ...p, [role]: { ...p[role], [feature]: !p[role][feature] } }));
    };

    // --- Derived stats ---
    const stats = useMemo(() => ({
        totalUsers: users.length,
        active: users.filter(u => u.status === 'active').length,
        meetings: meetings.length,
        recordings: recordings.length,
    }), [users, meetings, recordings]);

    // Drawer
    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
                <LogoText sx={{
                    fontFamily: "Righteous, sans-serif",
                }}>connectify</LogoText>      </Box>
            <Divider />
            <List>
                {menuItems.map(item => (
                    <ListItem key={item.key} disablePadding>
                        <ListItemButton selected={page === item.key} onClick={() => setPage(item.key)}>
                            <ListItemIcon sx={{ minWidth: 44 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setPage('settings')}>
                        <ListItemIcon sx={{ minWidth: 44 }}><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    // --- Page Components ---
    function DashboardHome() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }} gutterBottom>New report</Typography>
                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
                    <Box>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' } }}>
                            <SoftCard>
                                <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
                                <Typography variant="h5" fontWeight="bold">$528,976.82</Typography>
                                <Typography variant="caption" color="error">-7.9%</Typography>
                            </SoftCard>

                            <SoftCard>
                                <Typography variant="subtitle2" color="text.secondary">Top sales</Typography>
                                <Typography variant="h6" fontWeight="bold">Mikasa</Typography>
                                <Typography variant="caption">72 deals</Typography>
                            </SoftCard>

                            <SoftCard>
                                <Typography variant="subtitle2" color="text.secondary">Best deal</Typography>
                                <Typography variant="h6" fontWeight="bold">$42,300</Typography>
                                <Typography variant="caption">Rolf Inc.</Typography>
                            </SoftCard>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <SoftCard>
                                <Typography variant="h6">Platform Revenue Breakdown</Typography>
                                <Typography variant="body2" color="text.secondary">(Charts placeholder) — integrate recharts or chart.js here.</Typography>
                                <Box sx={{ height: 180, mt: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#faf7f8)' }} />
                            </SoftCard>
                        </Box>
                    </Box>

                    <Box>
                        <SoftCard>
                            <Typography variant="subtitle2" color="text.secondary">Quick stats</Typography>
                            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Total users</Typography>
                                    <Typography variant="body2" fontWeight="bold">{stats.totalUsers}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Active</Typography>
                                    <Typography variant="body2" fontWeight="bold">{stats.active}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Meetings</Typography>
                                    <Typography variant="body2" fontWeight="bold">{stats.meetings}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2">Recordings</Typography>
                                    <Typography variant="body2" fontWeight="bold">{stats.recordings}</Typography>
                                </Box>
                            </Box>
                        </SoftCard>

                        <Box sx={{ mt: 2 }}>
                            <SoftCard>
                                <Typography variant="subtitle2" color="text.secondary">Quick actions</Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                    <Button variant="contained" onClick={() => setPage('accounts')}>Manage accounts</Button>
                                    <Button variant="outlined" onClick={() => setPage('recordings')}>View recordings</Button>
                                </Box>
                            </SoftCard>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    function AccountsPage() {
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Righteous, sans-serif',
                            padding: '8px 0',
                        }}>Account Management</Typography>
                    <Box>
                        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => { /* export */ alert('Exporting CSV (placeholder)') }}>Export</Button>
                        <Button variant="contained" onClick={openCreate}>+ Create Account</Button>
                    </Box>
                </Box>

                <SoftCard>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Users</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(u => (
                                <TableRow key={u.id} hover>
                                    <TableCell>{u.id}</TableCell>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>{u.role}</TableCell>
                                    <TableCell>{u.plan}</TableCell>
                                    <TableCell>{u.status}</TableCell>
                                    <TableCell align="right">
                                        <Button size="small" onClick={() => toggleUserStatus(u.id)} sx={{ mr: 1 }}>{u.status === 'active' ? 'Suspend' : 'Activate'}</Button>
                                        <Button size="small" color="error" onClick={() => deleteUser(u.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SoftCard>

                <Dialog open={createOpen} onClose={closeCreate} fullWidth maxWidth="sm">
                    <DialogTitle>Create account</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
                            <TextField label="Full name" value={newUser.name} onChange={(e) => setNewUser(s => ({ ...s, name: e.target.value }))} />
                            <TextField label="Email" value={newUser.email} onChange={(e) => setNewUser(s => ({ ...s, email: e.target.value }))} />
                            <TextField select label="Role" value={newUser.role} onChange={(e) => setNewUser(s => ({ ...s, role: e.target.value }))}>
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>
                            <TextField select label="Plan" value={newUser.plan} onChange={(e) => setNewUser(s => ({ ...s, plan: e.target.value }))}>
                                <MenuItem value="free">Free</MenuItem>
                                <MenuItem value="standard">Standard</MenuItem>
                                <MenuItem value="premium">Premium</MenuItem>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeCreate}>Cancel</Button>
                        <Button variant="contained" onClick={createAccount}>Create</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    function PermissionsPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Permissions & Roles</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {Object.keys(permissions).map(role => (
                        <SoftCard key={role} sx={{ minWidth: 240 }}>
                            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>{role}</Typography>
                            <Box sx={{ mt: 1, display: 'grid', gap: 1 }}>
                                {Object.keys(permissions[role]).map(feature => (
                                    <FormControlLabel
                                        key={feature}
                                        control={<Switch checked={permissions[role][feature]} onChange={() => togglePermission(role, feature)} />}
                                        label={feature}
                                    />
                                ))}
                            </Box>
                        </SoftCard>
                    ))}
                </Box>
            </Box>
        );
    }

    function MeetingsPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Meetings</Typography>
                <SoftCard>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Host</TableCell>
                                <TableCell>Participants</TableCell>
                                <TableCell>Duration (min)</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map(m => (
                                <TableRow key={m.id} hover>
                                    <TableCell>{m.id}</TableCell>
                                    <TableCell>{m.title}</TableCell>
                                    <TableCell>{m.host}</TableCell>
                                    <TableCell>{m.participants}</TableCell>
                                    <TableCell>{m.duration}</TableCell>
                                    <TableCell>{m.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SoftCard>
            </Box>
        );
    }

    function RecordingsPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Recordings</Typography>
                <SoftCard>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Meeting</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recordings.map(r => (
                                <TableRow key={r.id} hover>
                                    <TableCell>{r.id}</TableCell>
                                    <TableCell>{r.name}</TableCell>
                                    <TableCell>{r.meetingId}</TableCell>
                                    <TableCell>{r.size}</TableCell>
                                    <TableCell align="right">
                                        <Button startIcon={<PlayCircleOutlineIcon />} sx={{ mr: 1 }} onClick={() => alert('Play (placeholder)')}>Play</Button>
                                        <Button startIcon={<DownloadIcon />} sx={{ mr: 1 }} onClick={() => downloadRecording(r)}>Download</Button>
                                        <Button startIcon={<DeleteIcon />} color="error" onClick={() => removeRecording(r.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SoftCard>
            </Box>
        );
    }

    function TranscriptsPage() {
        const [q, setQ] = useState('');
        const filtered = transcripts.filter(t => t.snippet.toLowerCase().includes(q.toLowerCase()));
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Righteous, sans-serif',
                        padding: '8px 0',
                    }}>Transcripts</Typography>
                    <TextField placeholder="Search transcripts" size="small" value={q} onChange={(e) => setQ(e.target.value)} />
                </Box>
                <SoftCard>
                    {filtered.map(t => (
                        <Box key={t.id} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2">{t.meetingId}</Typography>
                            <Typography variant="body2">{t.snippet}</Typography>
                            <Divider sx={{ my: 1 }} />
                        </Box>
                    ))}
                    {filtered.length === 0 && <Typography color="text.secondary">No transcripts found.</Typography>}
                </SoftCard>
            </Box>
        );
    }

    function UsagePage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Usage Stats</Typography>
                <SoftCard>
                    <Typography variant="subtitle1">Active calls (last 24h)</Typography>
                    <Box sx={{ height: 160, mt: 2, borderRadius: 2, background: 'linear-gradient(180deg,#fff,#fcfbfc)' }} />
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">Avg duration</Typography>
                            <Typography variant="h6">28m</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">Peak users</Typography>
                            <Typography variant="h6">342</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2">Calls today</Typography>
                            <Typography variant="h6">1,234</Typography>
                        </Box>
                    </Box>
                </SoftCard>
            </Box>
        );
    }

    function BillingPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Billing & Subscriptions</Typography>
                <SoftCard sx={{ mt: 2 }}>
                    <Typography>Placeholder for invoices, usage-based billing, plan limits and subscription management.</Typography>
                </SoftCard>
            </Box>
        );
    }

    function SupportPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Support</Typography>
                <SoftCard sx={{ mt: 2 }}>
                    <Typography>Tickets, feedback, and user reports will show here.</Typography>
                </SoftCard>
            </Box>
        );
    }

    function SettingsPage() {
        return (
            <Box>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Righteous, sans-serif',
                    padding: '8px 0',
                }}>Settings</Typography>
                <SoftCard sx={{ mt: 2 }}>
                    <Typography>App-wide configuration, integrations (S3 for recordings), storage, and retention policies.</Typography>
                </SoftCard>
            </Box>
        );
    }

    const pageMap = {
        dashboard: <DashboardHome />,
        accounts: <AccountsPage />,
        permissions: <PermissionsPage />,
        meetings: <MeetingsPage />,
        recordings: <RecordingsPage />,
        transcripts: <TranscriptsPage />,
        usage: <UsagePage />,
        billing: <BillingPage />,
        support: <SupportPage />,
        settings: <SettingsPage />,
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#fbf9f8', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    backgroundColor: '#fff',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: '1px solid #eee',
                    padding: 1,
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}>
                        <MenuIcon />
                    </IconButton>

                    <TextField
                        placeholder="Try searching insights"
                        size="small"
                        sx={{ backgroundColor: '#f5f5f5', borderRadius: 2, width: 380, '& fieldset': { border: 'none' } }}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    <Button variant="text" sx={{ mr: 1 }}>Timeframe</Button>
                    <Badge badgeContent={7} color="error" sx={{ mr: 2 }}>
                        <Avatar sx={{ bgcolor: '#f28b82' }}>A</Avatar>
                    </Badge>
                    <Avatar sx={{ bgcolor: '#fbbc04', mr: 1 }}>B</Avatar>
                    <Avatar sx={{ bgcolor: '#34a853' }}>C</Avatar>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', paddingTop: 2 } }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
                {pageMap[page]}
            </Box>
        </Box>
    );
}
