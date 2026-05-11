class SecurityLogger { 
    constructor() {
        this.logs = [];
        this.monitoringInterval = null;
        this.isMonitoring = false;
        this.eventTypes = ['Authentication', 'Network', 'File System', 'Process', 'Memory', 'Threat'];
        this.severityLevels = ['Low', 'Medium', 'High', 'Critical'];
        this.sources = ['auth_service', 'firewall', 'file_monitor', 'process_tracker', 'memory_manager', 'threat_detector'];
        
        this.initialize();
        this.setupEventListeners();
        this.updateSystemInfo();
    }
    
    initialize() {
        // Add initial sample logs
        this.generateSampleLogs(3);
        this.updateUI();
    }
    
    setupEventListeners() {
        // Monitor controls
        document.getElementById('start-monitoring').addEventListener('click', () => this.startMonitoring());
        document.getElementById('stop-monitoring').addEventListener('click', () => this.stopMonitoring());
        
        // Action buttons
        document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeVulnerabilities());
        document.getElementById('export-logs').addEventListener('click', () => this.exportLogs());
        document.getElementById('simulate-attack').addEventListener('click', () => this.simulateAttack());
        document.getElementById('clear-logs').addEventListener('click', () => this.clearLogs());
        
        // Filters
        document.getElementById('severity-filter').addEventListener('change', () => this.updateUI());
        document.getElementById('type-filter').addEventListener('change', () => this.updateUI());
    }
    
    generateSampleLogs(count) {
        for (let i = 0; i < count; i++) {
            const event = this.generateRandomEvent();
            this.addLog(event);
        }
    }
    
    generateRandomEvent() {
        const type = this.eventTypes[Math.floor(Math.random() * this.eventTypes.length)];
        const severity = this.severityLevels[Math.floor(Math.random() * this.severityLevels.length)];
        const source = this.sources[Math.floor(Math.random() * this.sources.length)];
        
        const events = {
            'Authentication': [
                'Failed login attempt from IP 192.168.1.' + Math.floor(Math.random() * 255),
                'User logged in from new device',
                'Password policy violation detected',
                'Multi-factor authentication required',
                'Account lockout after 5 failed attempts'
            ],
            'Network': [
                'Suspicious port scan detected',
                'Firewall blocked malicious IP',
                'VPN connection established',
                'DDoS protection activated',
                'Unusual outbound traffic pattern'
            ],
            'File System': [
                'Unauthorized file access attempt',
                'File integrity check completed',
                'Sensitive file modified',
                'Backup completed successfully',
                'File permission changed'
            ],
            'Process': [
                'Unauthorized process execution',
                'High CPU usage detected',
                'Process terminated by security',
                'Memory leak detected',
                'New system service started'
            ],
            'Threat': [
                'Potential malware detected',
                'Ransomware behavior identified',
                'Phishing attempt blocked',
                'Zero-day exploit attempt',
                'Security patch applied'
            ]
        };
        
        const descriptions = events[type] || ['Security event detected'];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        return {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            type: type,
            severity: severity,
            description: description,
            source: source,
            details: this.generateDetails(type, severity)
        };
    }
    
    generateDetails(type, severity) {
        const details = {
            'Authentication': `IP: 192.168.1.${Math.floor(Math.random() * 255)} | User: admin | Action: ${severity === 'Critical' ? 'BLOCKED' : 'LOGGED'}`,
            'Network': `Port: ${Math.floor(Math.random() * 65535)} | Protocol: TCP | Action: ${severity === 'Critical' ? 'BLOCKED' : 'MONITORED'}`,
            'File System': `Path: /var/log/system.log | Permission: 644 | User: root`,
            'Process': `PID: ${Math.floor(Math.random() * 10000)} | CPU: ${Math.floor(Math.random() * 100)}% | Memory: ${Math.floor(Math.random() * 500)}MB`,
            'Threat': `Threat Level: ${severity} | Confidence: ${Math.floor(Math.random() * 100)}% | Action: ${severity === 'Critical' ? 'QUARANTINED' : 'SCANNED'}`
        };
        
        return details[type] || `Event Type: ${type} | Severity: ${severity}`;
    }
    
    addLog(event) {
        this.logs.unshift(event);
        this.updateUI();
        this.showNotification(event);
    }
    
    showNotification(event) {
        if (event.severity === 'Critical' || event.severity === 'High') {
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="notification-content">
                    <strong>${event.severity} Alert</strong>
                    <p>${event.description}</p>
                    <small>${new Date(event.timestamp).toLocaleTimeString()}</small>
                </div>
            `;
            
            // Style the notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #2D2D2D, #3a2a2a);
                border-left: 4px solid ${event.severity === 'Critical' ? '#DC143C' : '#9A1750'};
                padding: 15px;
                border-radius: 10px;
                display: flex;
                gap: 15px;
                align-items: center;
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                border: 1px solid rgba(139, 0, 0, 0.3);
                color: white;
                font-family: 'Poppins', sans-serif;
            `;
            
            document.body.appendChild(notification);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }
    
    showSystemNotification(message, type = 'info') {
        const colors = {
            'success': '#D4B483',
            'error': '#DC143C',
            'warning': '#9A1750',
            'info': '#5D001E'
        };
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2D2D2D, #3a2a2a);
            border-left: 4px solid ${colors[type]};
            padding: 12px 20px;
            border-radius: 10px;
            color: white;
            font-family: 'Poppins', sans-serif;
            z-index: 1000;
            animation: slideIn 0.3s ease
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            border: 1px solid rgba(139, 0, 0, 0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        document.getElementById('status-dot').style.background = '#DC143C';
        document.getElementById('status-text').textContent = 'Monitoring Active';
        document.getElementById('start-monitoring').disabled = true;
        
        // Generate events every 2-5 seconds
        this.monitoringInterval = setInterval(() => {
            const event = this.generateRandomEvent();
            this.addLog(event);
        }, Math.random() * 3000 + 2000);
        
        this.showSystemNotification('Real-time monitoring started', 'success');
    }
    
    stopMonitoring() {
        if (!this.isMonitoring) return;
        
        this.isMonitoring = false;
        clearInterval(this.monitoringInterval);
        document.getElementById('status-dot').style.background = '#666666';
        document.getElementById('status-text').textContent = 'Monitoring Stopped';
        document.getElementById('start-monitoring').disabled = false;
        
        this.showSystemNotification('Monitoring stopped', 'info');
    }
    
    clearLogs() {
        if (this.logs.length === 0) return;
        
        if (confirm('Are you sure you want to clear all logs? This cannot be undone.')) {
            this.logs = [];
            this.updateUI();
            this.showSystemNotification('All logs cleared', 'warning');
        }
    }
    
    exportLogs() {
        if (this.logs.length === 0) {
            this.showSystemNotification('No logs to export', 'warning');
            return;
        }
        
        let logText = '=== SECURITY EVENT LOGS ===\n';
        logText += `Generated: ${new Date().toLocaleString()}\n`;
        logText += `Total Events: ${this.logs.length}\n\n`;
        
        this.logs.forEach(log => {
            logText += `[${new Date(log.timestamp).toLocaleString()}] ${log.severity} - ${log.type}\n`;
            logText += `Event: ${log.description}\n`;
            logText += `Source: ${log.source}\n`;
            logText += `Details: ${log.details}\n`;
            logText += '―'.repeat(50) + '\n';
        });
        
        const blob = new Blob([logText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `security_logs_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSystemNotification('Logs exported successfully', 'success');
    }
    
    simulateAttack() {
        this.showSystemNotification('Simulating security attack...', 'warning');
        
        // Generate critical events
        const attacks = [
            'Brute force attack detected',
            'Malware injection attempt',
            'Privilege escalation attempt',
            'Data exfiltration detected',
            'Ransomware behavior detected'
        ];
        
        attacks.forEach((attack, i) => {
            setTimeout(() => {
                const event = {
                    id: Date.now() + Math.random().toString(36).substr(2, 9),
                    timestamp: new Date().toISOString(),
                    type: 'Threat',
                    severity: i < 2 ? 'Critical' : 'High',
                    description: 'SIMULATION: ' + attack,
                    source: 'attack_simulator',
                    details: 'This is a simulated attack for testing purposes. No real threat exists.'
                };
                this.addLog(event);
            }, i * 800);
        });
    }
    
    analyzeVulnerabilities() {
        // Advanced vulnerability analysis
        const analysis = this.performAdvancedAnalysis();
        
        // Update UI
        this.updateRiskScore(analysis.riskScore);
        this.displayVulnerabilities(analysis.vulnerabilities);
        
        // Show analysis summary
        const summary = this.generateAnalysisSummary(analysis);
        this.showAnalysisSummary(summary);
        
        // Update last scan
        document.getElementById('last-scan').textContent = new Date().toLocaleTimeString();
        
        const alertType = analysis.riskScore > 70 ? 'error' : analysis.riskScore > 40 ? 'warning' : 'success';
        this.showSystemNotification(`Security scan complete. Risk score: ${analysis.riskScore}%`, alertType);
    }
    
    performAdvancedAnalysis() {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        const recentLogs = this.logs.filter(log => new Date(log.timestamp) > oneHourAgo);
        
        const criticalCount = this.logs.filter(log => log.severity === 'Critical').length;
        const highCount = this.logs.filter(log => log.severity === 'High').length;
        const mediumCount = this.logs.filter(log => log.severity === 'Medium').length;
        
        let vulnerabilities = [];
        let riskScore = 0;
        
        // ===== PATTERN DETECTION ALGORITHMS =====
        
        // 1. Brute Force Detection
        const authFailures = this.logs.filter(log => 
            log.type === 'Authentication' && 
            log.description.includes('Failed login')
        );
        
        if (authFailures.length > 5) {
            vulnerabilities.push({
                title: 'Brute Force Attack Pattern',
                description: `Detected ${authFailures.length} failed authentication attempts. Possible brute force attack in progress.`,
                severity: 'High',
                recommendation: 'Implement account lockout after 3 failed attempts, enable CAPTCHA, and monitor suspicious IPs.',
                category: 'Authentication',
                confidence: Math.min(100, authFailures.length * 15)
            });
            riskScore += 25;
        }
        
        // 2. Port Scanning Detection
        const networkEvents = this.logs.filter(log => 
            log.type === 'Network' && 
            log.description.includes('port scan')
        );
        
        if (networkEvents.length > 3) {
            vulnerabilities.push({
                title: 'Port Scanning Activity',
                description: `Multiple port scan attempts detected (${networkEvents.length} events). System reconnaissance in progress.`,
                severity: 'Medium',
                recommendation: 'Configure firewall to block scanning IPs, implement intrusion detection system, and review open ports.',
                category: 'Network',
                confidence: 75
            });
            riskScore += 15;
        }
        
        // 3. Multiple Critical Events
        if (criticalCount > 3) {
            vulnerabilities.push({
                title: 'Multiple Critical Security Events',
                description: `${criticalCount} critical events detected within short timeframe. System may be under active attack.`,
                severity: 'Critical',
                recommendation: 'Immediate security audit required. Isolate affected systems and initiate incident response protocol.',
                category: 'System',
                confidence: Math.min(100, criticalCount * 20)
            });
            riskScore += 40;
        }
        
        // 4. Unusual File Access Pattern
        const fileAccessEvents = this.logs.filter(log => 
            log.type === 'File System' && 
            (log.description.includes('Unauthorized') || log.severity === 'High')
        );
        
        if (fileAccessEvents.length > 2) {
            vulnerabilities.push({
                title: 'Suspicious File Access Pattern',
                description: `Multiple unauthorized file access attempts detected. Possible data exfiltration attempt.`,
                severity: 'High',
                recommendation: 'Review file permissions, enable file integrity monitoring, and audit user access patterns.',
                category: 'File System',
                confidence: 80
            });
            riskScore += 20;
        }
        
        // 5. Process Execution Anomaly
        const suspiciousProcesses = this.logs.filter(log => 
            log.type === 'Process' && 
            log.description.includes('Unauthorized process')
        );
        
        if (suspiciousProcesses.length > 1) {
            vulnerabilities.push({
                title: 'Unauthorized Process Execution',
                description: `Unauthorized processes executed on system. Possible malware or unauthorized software installation.`,
                severity: 'Critical',
                recommendation: 'Run full system malware scan, review process whitelist, and monitor process creation events.',
                category: 'Process',
                confidence: 85
            });
            riskScore += 30;
        }
        
        // 6. High Frequency Analysis
        const eventsPerMinute = recentLogs.length / 60;
        if (eventsPerMinute > 10) {
            vulnerabilities.push({
                title: 'High Event Frequency',
                description: `Unusually high event rate detected (${eventsPerMinute.toFixed(1)} events/minute). May indicate automated attack.`,
                severity: 'Medium',
                recommendation: 'Adjust monitoring thresholds, implement rate limiting, and investigate source of high activity.',
                category: 'System',
                confidence: 70
            });
            riskScore += 10;
        }
        
        // 7. Threat Correlation
        const threatEvents = this.logs.filter(log => log.type === 'Threat');
        if (threatEvents.length > 0) {
            vulnerabilities.push({
                title: 'Active Threat Indicators',
                description: `${threatEvents.length} threat events detected. System may be compromised or targeted.`,
                severity: 'High',
                recommendation: 'Initiate threat hunting, update antivirus signatures, and review security controls.',
                category: 'Threat',
                confidence: 90
            });
            riskScore += 20;
        }
        
        // 8. Memory-based Attacks Detection
        const memoryEvents = this.logs.filter(log => 
            log.type === 'Memory' && 
            (log.description.includes('overflow') || log.description.includes('corruption'))
        );
        
        if (memoryEvents.length > 0) {
            vulnerabilities.push({
                title: 'Memory-based Attack Attempts',
                description: `Buffer overflow or memory corruption attempts detected. Possible exploit attempts.`,
                severity: 'Critical',
                recommendation: 'Enable ASLR, DEP protections, and conduct code review for memory safety issues.',
                category: 'Memory',
                confidence: 95
            });
            riskScore += 35;
        }
        
        // Calculate final risk score
        riskScore += (criticalCount * 20) + (highCount * 10) + (mediumCount * 5);
        riskScore = Math.min(100, riskScore);
        
        // Add baseline vulnerabilities if none detected
        if (vulnerabilities.length === 0 && riskScore < 20) {
            vulnerabilities.push({
                title: 'No Critical Vulnerabilities Detected',
                description: 'System appears to be operating within normal security parameters. No immediate threats detected.',
                severity: 'Low',
                recommendation: 'Continue regular monitoring and scheduled security scans.',
                category: 'General',
                confidence: 95
            });
        }
        
        // Sort vulnerabilities by severity
        vulnerabilities.sort((a, b) => {
            const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        });
        
        return {
            riskScore,
            vulnerabilities,
            stats: {
                totalEvents: this.logs.length,
                criticalCount,
                highCount,
                recentEvents: recentLogs.length,
                eventRate: eventsPerMinute
            }
        };
    }
    
    generateAnalysisSummary(analysis) {
        const { riskScore, vulnerabilities, stats } = analysis;
        
        const criticalVulns = vulnerabilities.filter(v => v.severity === 'Critical').length;
        const highVulns = vulnerabilities.filter(v => v.severity === 'High').length;
        
        return {
            riskLevel: riskScore > 70 ? 'CRITICAL' : riskScore > 40 ? 'HIGH' : riskScore > 20 ? 'MODERATE' : 'LOW',
            riskScore,
            totalVulnerabilities: vulnerabilities.length,
            criticalVulnerabilities: criticalVulns,
            highVulnerabilities: highVulns,
            recommendations: this.generateRecommendations(vulnerabilities),
            scanTime: new Date().toLocaleString()
        };
    }
    
    generateRecommendations(vulnerabilities) {
        const recommendations = new Set();
        
        vulnerabilities.forEach(vuln => {
            if (vuln.recommendation) {
                recommendations.add(vuln.recommendation);
            }
        });
        
        return Array.from(recommendations);
    }
    
    showAnalysisSummary(summary) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'analysis-summary';
        summaryDiv.innerHTML = `
            <div class="summary-header">
                <h3><i class="fas fa-file-medical-alt"></i> Security Analysis Summary</h3>
                <span class="risk-level ${summary.riskLevel.toLowerCase()}">${summary.riskLevel} RISK</span>
            </div>
            <div class="summary-stats">
                <div class="stat">
                    <span class="stat-label">Risk Score</span>
                    <span class="stat-value">${summary.riskScore}/100</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Total Vulnerabilities</span>
                    <span class="stat-value">${summary.totalVulnerabilities}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Critical Issues</span>
                    <span class="stat-value critical">${summary.criticalVulnerabilities}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">High Issues</span>
                    <span class="stat-value high">${summary.highVulnerabilities}</span>
                </div>
            </div>
            <div class="summary-recommendations">
                <h4>Top Recommendations:</h4>
                <ul>
                    ${summary.recommendations.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="summary-footer">
                <small>Scan completed: ${summary.scanTime}</small>
            </div>
        `;
        
        // Style the summary
        summaryDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #2D2D2D, #3a2a2a);
            border: 2px solid #DC143C;
            border-radius: 15px;
            padding: 25px;
            z-index: 2000;
            width: 500px;
            max-width: 90%;
            box-shadow: 0 15px 50px rgba(0,0,0,0.5);
            color: white;
            font-family: 'Poppins', sans-serif;
            animation: fadeIn 0.3s ease;
        `;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(220, 20, 60, 0.2);
            border: 1px solid #DC143C;
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
        closeBtn.onclick = () => summaryDiv.remove();
        
        summaryDiv.appendChild(closeBtn);
        document.body.appendChild(summaryDiv);
        
        // Remove after 10 seconds
        setTimeout(() => {
            if (summaryDiv.parentNode) {
                summaryDiv.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => summaryDiv.remove(), 300);
            }
        }, 10000);
    }
    
    updateRiskScore(score) {
        const riskFill = document.getElementById('risk-fill');
        const riskValue = document.getElementById('risk-value');
        const riskLabel = document.getElementById('risk-label');
        
        riskFill.style.width = `${score}%`;
        riskValue.textContent = score;
        
        if (score > 70) {
            riskLabel.textContent = 'Critical Risk';
            riskLabel.style.color = '#DC143C';
            riskLabel.style.background = 'rgba(220, 20, 60, 0.2)';
        } else if (score > 40) {
            riskLabel.textContent = 'High Risk';
            riskLabel.style.color = '#9A1750';
            riskLabel.style.background = 'rgba(154, 23, 80, 0.2)';
        } else if (score > 20) {
            riskLabel.textContent = 'Medium Risk';
            riskLabel.style.color = '#D4B483';
            riskLabel.style.background = 'rgba(212, 180, 131, 0.2)';
        } else {
            riskLabel.textContent = 'Low Risk';
            riskLabel.style.color = '#666666';
            riskLabel.style.background = 'rgba(102, 102, 102, 0.2)';
        }
    }
    
    displayVulnerabilities(vulnerabilities) {
        const container = document.getElementById('vulnerability-list');
        
        if (vulnerabilities.length === 0) {
            container.innerHTML = '<p class="no-issues">No vulnerabilities detected. System appears secure.</p>';
            return;
        }
        
        container.innerHTML = vulnerabilities.map(vuln => `
            <div class="vulnerability-item" data-category="${vuln.category.toLowerCase()}">
                <div class="vuln-header">
                    <h4><i class="fas fa-exclamation-triangle"></i> ${vuln.title}</h4>
                    <span class="severity-badge severity-${vuln.severity.toLowerCase()}">${vuln.severity}</span>
                </div>
                <div class="vuln-body">
                    <p class="vuln-description">${vuln.description}</p>
                    <div class="vuln-meta">
                        <span class="category">${vuln.category}</span>
                        <span class="confidence">Confidence: ${vuln.confidence}%</span>
                    </div>
                    <p class="recommendation"><strong>Recommendation:</strong> ${vuln.recommendation}</p>
                </div>
            </div>
        `).join('');
    }
    
    updateUI() {
        const severityFilter = document.getElementById('severity-filter').value;
        const typeFilter = document.getElementById('type-filter').value;
        
        // Filter logs
        let filteredLogs = this.logs;
        
        if (severityFilter !== 'all') {
            filteredLogs = filteredLogs.filter(log => 
                log.severity.toLowerCase() === severityFilter
            );
        }
        
        if (typeFilter !== 'all') {
            filteredLogs = filteredLogs.filter(log => 
                log.type.toLowerCase().includes(typeFilter.toLowerCase())
            );
        }
        
        // Update counts
        const criticalCount = this.logs.filter(log => log.severity === 'Critical').length;
        const highCount = this.logs.filter(log => log.severity === 'High').length;
        const mediumCount = this.logs.filter(log => log.severity === 'Medium').length;
        const lowCount = this.logs.filter(log => log.severity === 'Low').length;
        const totalCount = this.logs.length;
        
        document.getElementById('critical-count').textContent = criticalCount;
        document.getElementById('high-count').textContent = highCount;
        document.getElementById('medium-count').textContent = mediumCount;
        document.getElementById('total-logs').textContent = totalCount;
        document.getElementById('total-events').textContent = totalCount;
        document.getElementById('visible-logs').textContent = filteredLogs.length;
        
        // Update logs table
        this.updateLogsTable(filteredLogs);
        
        // Auto-update risk score based on current events
        const riskScore = Math.min(100, (criticalCount * 20) + (highCount * 10) + (mediumCount * 5));
        this.updateRiskScore(riskScore);
    }
    
    updateLogsTable(logs) {
        const tbody = document.getElementById('logs-body');
        tbody.innerHTML = '';
        
        // Show only first 50 logs for performance
        const displayLogs = logs.slice(0, 50);
        
        displayLogs.forEach(log => {
            const row = document.createElement('tr');
            const time = new Date(log.timestamp).toLocaleTimeString();
            const severityClass = `severity-${log.severity.toLowerCase()}`;
            
            row.innerHTML = `
                <td>${time}</td>
                <td><span class="log-type">${log.type}</span></td>
                <td><span class="severity-badge ${severityClass}">${log.severity}</span></td>
                <td>${log.description}</td>
                <td><code class="source-code">${log.source}</code></td>
                <td>
                    <button class="action-btn" onclick="logger.viewLog('${log.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="logger.deleteLog('${log.id}')" title="Delete Log">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }
    
    viewLog(logId) {
        const log = this.logs.find(l => l.id === logId);
        if (!log) return;
        
        const details = `
Time: ${new Date(log.timestamp).toLocaleString()}
Type: ${log.type}
Severity: ${log.severity}
Description: ${log.description}
Source: ${log.source}
Details: ${log.details}
        `;
        
        alert('Log Details:\n\n' + details);
    }
    
    deleteLog(logId) {
        if (confirm('Delete this log entry?')) {
            this.logs = this.logs.filter(log => log.id !== logId);
            this.updateUI();
            this.showSystemNotification('Log entry deleted', 'info');
        }
    }
    
    updateSystemInfo() {
        // Set platform info
        const userAgent = navigator.userAgent.substring(0, 50) + (navigator.userAgent.length > 50 ? '...' : '');
        document.getElementById('user-agent').textContent = userAgent;
        document.getElementById('platform').textContent = navigator.platform;
        
        // Simulate memory usage updates
        setInterval(() => {
            const memory = Math.floor(Math.random() * 60) + 20; // 20-80%
            document.getElementById('memory-usage').textContent = 
                `${memory}% (${Math.floor(memory * 16)}MB/16384MB)`;
        }, 3000);
        
        // Initial memory usage
        const initialMemory = Math.floor(Math.random() * 60) + 20;
        document.getElementById('memory-usage').textContent = 
            `${initialMemory}% (${Math.floor(initialMemory * 16)}MB/16384MB)`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.logger = new SecurityLogger();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
        }
    `;
    document.head.appendChild(style);
});
