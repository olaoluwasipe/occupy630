# Quick Reference - Execution Prompts

This document provides ready-to-use prompts for completing the Occupy630 project. Copy and paste these prompts directly.

---

## 🔴 CRITICAL - Do First

### Fix Dashboard Runtime Errors
```
Review and fix all runtime errors in the Dashboard component. Ensure all undefined variables are properly imported or defined, including PrimaryButton, SecondaryButton, Slider, formatPrice, formatDate, statusKeys, and requestRentPay function. Test the dashboard thoroughly after fixes.
```

### Fix Route Authentication
```
Review all routes in web.php and ensure proper authentication middleware is applied. Fix the home route that assumes Auth::user() exists without checking. Add proper null checks and redirect unauthenticated users appropriately.
```

### Complete Model Relationships
```
Complete the incomplete ownedApartments() method in the User model. Review all model relationships and ensure they are properly defined with correct foreign keys and relationship types.
```

---

## 🟠 HIGH PRIORITY

### Payment System
```
Implement a complete payment system for apartment rentals. Integrate Paystack payment gateway with proper webhook handling, payment verification, and transaction recording. Create payment history views and receipts.
```

### Real-time Chat
```
Complete the real-time chat functionality using Laravel Echo and Pusher. Implement message delivery status (sent, delivered, read), typing indicators, file attachments in chat, and chat notifications.
```

### Notification System
```
Build a comprehensive notification system with real-time updates. Create notification preferences, notification center UI, mark as read/unread functionality, and email notifications for important events.
```

### Mobile Responsiveness
```
Audit all pages for mobile responsiveness. Fix any layout issues on mobile devices, ensure touch-friendly interactions, and optimize images for different screen sizes.
```

### Database Optimization
```
Optimize database queries by adding proper indexes, using eager loading to prevent N+1 queries, implementing query caching, and optimizing slow queries.
```

---

## 🟡 MEDIUM PRIORITY

### Search Functionality
```
Implement global search functionality that searches across courses, apartments, users, assignments, and forums. Add filters, sorting options, and search result highlighting.
```

### Calendar & Scheduling
```
Create a comprehensive calendar view for meetings, assignments, and tasks. Add calendar integration (Google Calendar, Outlook), event reminders, and recurring events.
```

### Loading States
```
Add proper loading states, skeleton screens, and progress indicators throughout the application. Implement optimistic UI updates where appropriate.
```

### Form Validation
```
Enhance all forms with real-time validation, clear error messages, and success feedback. Add form auto-save functionality for long forms.
```

### Two-Factor Authentication
```
Enhance security by implementing two-factor authentication (2FA), password strength requirements, session management, and proper logout functionality.
```

---

## 🟢 NICE TO HAVE

### Dark Mode
```
Implement a dark mode theme with user preference persistence. Create a theme toggle component and ensure all components support both light and dark themes.
```

### Analytics Dashboard
```
Implement analytics dashboard for admins showing user engagement, course completion rates, apartment booking statistics, revenue reports, and user activity.
```

### Email Templates
```
Create comprehensive email templates for all system notifications including welcome emails, course enrollment, assignment reminders, payment receipts, and apartment booking confirmations.
```

### Multi-language Support
```
Implement internationalization (i18n) with support for multiple languages. Add language switcher and translate all user-facing content.
```

### Progressive Web App
```
Convert the application to a Progressive Web App with offline functionality, push notifications, and installable app experience.
```

---

## 📋 TESTING PROMPTS

### Unit Tests
```
Write comprehensive unit tests for all models, controllers, and utility functions. Achieve at least 80% code coverage. Use PHPUnit for backend and Jest/React Testing Library for frontend.
```

### Feature Tests
```
Create feature tests for all major user flows including registration, login, course enrollment, apartment booking, payment processing, and admin operations.
```

---

## 📚 DOCUMENTATION PROMPTS

### API Documentation
```
Create comprehensive API documentation using Laravel API documentation tools or Swagger/OpenAPI. Document all endpoints, request/response formats, authentication, and error codes.
```

### User Documentation
```
Create user guides, FAQ section, video tutorials, and help documentation. Add in-app tooltips and guided tours for new users.
```

---

## 🚀 DEPLOYMENT PROMPTS

### CI/CD Pipeline
```
Set up continuous integration and deployment pipeline using GitHub Actions or similar. Include automated testing, code quality checks, and deployment to staging/production.
```

### Monitoring
```
Implement application monitoring with error tracking (Sentry), performance monitoring, log aggregation, and uptime monitoring. Set up alerts for critical issues.
```

---

## Usage Instructions

1. Copy the prompt you need
2. Paste it into your AI assistant or task management system
3. Execute the task
4. Test and verify completion
5. Move to the next prompt

**Tip:** Work through prompts in priority order (🔴 → 🟠 → 🟡 → 🟢) for best results.

