import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Card,
    Typography,
    IconButton,
    TextField,
    Divider,
    Drawer,
    Tooltip,
    Button,
    Avatar,
    styled, 
    Stack,
    Paper,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import DescriptionIcon from "@mui/icons-material/Description";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

export default function MeetingRoom() {
    const [participants, setParticipants] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const localVideoRef = useRef(null);
    const localStream = useRef(null);

    // inside MeetingRoom component, near other state declarations:
    const [attachments, setAttachments] = useState([]); // { id, file, name, size, type, url, time }

    const humanFileSize = (bytes) => {
        if (bytes === 0) return "0 B";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        return (bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0) + " " + sizes[i];
    };

    const handleFiles = (filesList) => {
        const files = Array.from(filesList);
        const newItems = files.map((file) => {
            const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
            const url = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
            return {
                id,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                url,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
        });
        setAttachments((prev) => [...prev, ...newItems]);
    };

    // remove and revoke objectURL if needed
    const removeAttachment = (id) => {
        setAttachments((prev) => {
            const item = prev.find((a) => a.id === id);
            if (item && item.url) URL.revokeObjectURL(item.url);
            return prev.filter((a) => a.id !== id);
        });
    };

    // cleanup on unmount
    useEffect(() => {
        return () => {
            attachments.forEach((a) => a.url && URL.revokeObjectURL(a.url));
        };
    }, []); // empty deps -> runs on unmount

    useEffect(() => {
        startLocalStream();
    }, []);

    const startLocalStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            localStream.current = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            setParticipants([{ id: "local", stream }]);
        } catch (err) {
            console.error("Error starting stream:", err);
        }
    };

    const toggleMute = () => {
        if (!localStream.current) return;
        localStream.current.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsMuted(prev => !prev);
    };

    const toggleVideo = () => {
        if (!localStream.current) return;
        localStream.current.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setVideoEnabled(prev => !prev);
    };

    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        const newMessage = { sender: "You", text: chatInput };
        setChatMessages(prev => [...prev, newMessage]);
        setChatInput("");
        // TODO: send message via signaling server
    };

    return (
        <Box sx={{ height: "75vh", background: "#f9fafb", display: "flex", flexDirection: "column" }}>
            {/* Video Grid */}
            <Box
                sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns:
                        participants.length > 1 ? "repeat(auto-fit, minmax(300px, 1fr))" : "1fr",
                    gap: 2,
                    p: 0,
                }}
            >
                {participants.map((p) => (
                    <Card
                        key={p.id}
                        sx={{
                            borderRadius: 0,
                            overflow: "hidden",
                            background: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            position: "relative",
                        }}
                    >
                        <video
                            ref={p.id === "local" ? localVideoRef : null}
                            autoPlay
                            playsInline
                            muted={p.id === "local"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                background: "#000",
                            }}
                        />
                        <Typography
                            variant="subtitle2"
                            sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                background: "rgba(0,0,0,0.5)",
                                color: "#fff",
                                px: 1,
                                borderRadius: 1,
                                fontSize: "0.8rem",
                            }}
                        >
                            {p.id === "local" ? "You" : `Participant ${p.id}`}
                        </Typography>
                    </Card>
                ))}
            </Box>

            {/* Floating Toolbar */}
            <Box
                sx={{
                    height: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    background: "#fff",
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Tooltip title={isMuted ? "Unmute" : "Mute"}>
                    <IconButton
                        onClick={toggleMute}
                        sx={{
                            bgcolor: "#f3f4f6",
                            "&:hover": { bgcolor: "#e5e7eb" },
                        }}
                    >
                        {isMuted ? <MicOffIcon /> : <MicIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title={videoEnabled ? "Turn off camera" : "Turn on camera"}>
                    <IconButton
                        onClick={toggleVideo}
                        sx={{
                            bgcolor: "#f3f4f6",
                            "&:hover": { bgcolor: "#e5e7eb" },
                        }}
                    >
                        {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share Screen">
                    <IconButton sx={{ bgcolor: "#f3f4f6", "&:hover": { bgcolor: "#e5e7eb" } }}>
                        <ScreenShareIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share Document">
                    <IconButton sx={{ bgcolor: "#f3f4f6", "&:hover": { bgcolor: "#e5e7eb" } }}>
                        <DescriptionIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Open Chat">
                    <IconButton
                        onClick={() => setChatOpen(true)}
                        sx={{
                            bgcolor: "#f3f4f6",
                            "&:hover": { bgcolor: "#e5e7eb" },
                        }}
                    >
                        <ChatIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Chat Drawer */}
            <Drawer
                anchor="right"
                open={chatOpen}
                onClose={() => setChatOpen(false)}
                PaperProps={{
                    sx: {
                        width: 420,
                        background: "#fff",
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                        boxShadow: "0 12px 40px rgba(16,24,40,0.12)",
                    },
                }}
            >
                <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ px: 3, py: 2, borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <Typography
                            variant="h6"
                            sx={{ fontFamily: "Righteous, sans-serif", fontWeight: "bold", color: "#0f172a" }}
                        >
                            Meeting Chat
                        </Typography>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            Send messages, files, or images
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {/* Messages area */}
                    <Box sx={{ flex: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                        {chatMessages.map((msg, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                                    maxWidth: "85%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0.5,
                                }}
                            >
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#374151" }}>
                                    {msg.sender} • {msg.time ?? ""}
                                </Typography>

                                {/* text bubble */}
                                {msg.text && (
                                    <Box
                                        sx={{
                                            p: 1.25,
                                            borderRadius: 2,
                                            bgcolor: msg.sender === "You" ? "#e0f2fe" : "#f3f4f6",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ color: "#0f172a" }}>
                                            {msg.text}
                                        </Typography>
                                    </Box>
                                )}

                                {/* attachments inside message (if any) */}
                                {msg.attachments &&
                                    msg.attachments.map((att) => (
                                        <Box
                                            key={att.id}
                                            sx={{
                                                mt: 0.75,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: "#fff",
                                                boxShadow: "0 4px 10px rgba(2,6,23,0.06)",
                                            }}
                                        >
                                            {/* thumbnail or icon */}
                                            {att.url ? (
                                                <Box
                                                    component="img"
                                                    src={att.url}
                                                    alt={att.name}
                                                    sx={{ width: 64, height: 48, objectFit: "cover", borderRadius: 1 }}
                                                />
                                            ) : (
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        bgcolor: "#f3f4f6",
                                                    }}
                                                >
                                                    {/* choose icon by type */}
                                                    {att.type.includes("pdf") ? (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                            <path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#0f172a" strokeWidth="1.2" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                            <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" stroke="#0f172a" strokeWidth="1.2" />
                                                        </svg>
                                                    )}
                                                </Box>
                                            )}

                                            {/* file info */}
                                            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                                                <Typography noWrap sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                                                    {att.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: "gray" }}>
                                                    {humanFileSize(att.size)} • {att.time}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                            </Box>
                        ))}
                    </Box>
                    <Divider />

                    {/* Attachments preview BEFORE send */}
                    {attachments.length > 0 && (
                        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                            {attachments.map((att) => (
                                <Box key={att.id} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                    {att.url ? (
                                        <Box component="img" src={att.url} alt={att.name} sx={{ width: 64, height: 48, objectFit: "cover", borderRadius: 1 }} />
                                    ) : (
                                        <Box sx={{ width: 48, height: 48, bgcolor: "#f3f4f6", borderRadius: 1, display: "grid", placeItems: "center" }}>
                                            <DescriptionIcon />
                                        </Box>
                                    )}
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography noWrap sx={{ fontWeight: 600 }}>
                                            {att.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "gray" }}>
                                            {humanFileSize(att.size)}
                                        </Typography>
                                    </Box>
                                    <Button size="small" onClick={() => removeAttachment(att.id)} sx={{ textTransform: "none" }}>
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Input & controls */}
                    <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
                        {/* hidden file input */}
                        <input
                            id="file-input"
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            onChange={(e) => e.target.files && handleFiles(e.target.files)}
                        />
                        <label htmlFor="file-input">
                            <Tooltip title="Attach files">
                                <IconButton component="span" sx={{ bgcolor: "#f3f4f6", "&:hover": { bgcolor: "#e5e7eb" } }}>
                                    <DescriptionIcon />
                                </IconButton>
                            </Tooltip>
                        </label>

                        <TextField
                            size="small"
                            placeholder="Type a message..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            fullWidth
                            InputProps={{
                                sx: { borderRadius: 3, background: "#fff" },
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleChatSend();
                                }
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={() => {
                                if (attachments.length === 0 && !chatInput.trim()) return;
                                // send message along with attachments
                                handleChatSend();
                            }}
                            sx={{ textTransform: "none" }}
                        >
                            <SendIcon />
                        </Button>
                    </Box>

                </Box>

            </Drawer>
            
            </Box>
    );
}
