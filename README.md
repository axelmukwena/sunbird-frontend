# Tendiflow: Digital Attendance Tracking

A modern, paperless solution for tracking meeting attendance. Designed for Namibian companies, Tendiflow replaces traditional sign-in sheets with a secure, efficient, and data-rich digital platform.

## The Problem

Manual attendance tracking is inefficient, prone to errors, and difficult to analyze. Passing around a physical sheet of paper is cumbersome, data is hard to aggregate, and verifying attendance is nearly impossible. Tendiflow solves this by providing a seamless digital workflow for creating meetings, checking in attendees, and analyzing participation.

## Key Features

- **Organisation Management**: Users can sign up and create an organisation to manage their meetings centrally.

- **Effortless Meeting Creation**: Schedule new meetings in seconds, providing details like title, date, time, and location.

- **QR Code Check-in**: Each meeting automatically generates a unique QR code. Attendees simply scan the code with their smartphone to sign in.

- **Secure & Verifiable Attendance**:
  - **Location-Aware**: The app captures the attendee's geographic location upon check-in to verify their presence.
  - **Unique Device Fingerprinting**: A unique device fingerprint is generated for each check-in to prevent a single person from signing in multiple times for the same meeting.

- **Customizable Fields**: Meeting creators can add custom input fields to the check-in form to gather specific information from attendees (e.g., "Department", "Staff ID").

- **Attendee History**: Registered users can view a history of all the meetings they have attended across different organisations.

- **Data Export**: Easily export attendance sheets for reporting and record-keeping.

- **Real-time Dashboards**: Visualize attendance statistics and participation metrics to gain insights into meeting engagement.

## Technology Stack

- **Framework**: Next.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Deployment (Recommended)**: Vercel

## MongoDB Database Schema

Below is the proposed schema for MongoDB, using snake_case for all field names.

### users Collection

Stores information about registered users who can create organisations or view their attendance history.

```javascript
{
  "_id": "ObjectId",
  "user_id": "string (unique)",
  "email": "string (unique, lowercase)",
  "full_name": "string",
  "password_hash": "string",
  "organisation_id": "ObjectId (references organisations collection)",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

### organisations Collection

Stores information about the companies or entities creating meetings.

```javascript
{
  "_id": "ObjectId",
  "organisation_id": "string (unique)",
  "name": "string",
  "owner_id": "ObjectId (references users collection)",
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

### meetings Collection

Stores all meeting details, including the custom fields defined by the creator.

```javascript
{
  "_id": "ObjectId",
  "meeting_id": "string (unique)",
  "organisation_id": "ObjectId (references organisations collection)",
  "created_by": "ObjectId (references users collection)",
  "title": "string",
  "description": "string | null",
  "date": "ISODate",
  "start_time": "string (HH:MM)",
  "end_time": "string (HH:MM)",
  "location": "string",
  "status": "string (e.g., 'scheduled', 'in-progress', 'completed', 'cancelled')",
  "qr_code_url": "string | null",
  "check_in_url": "string | null",
  "custom_fields": [
    {
      "field_name": "string",
      "field_type": "string (e.g., 'text', 'number', 'email')",
      "is_required": "boolean"
    }
  ],
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

### attendees Collection

Stores a record for each person who attends a meeting. This is the core of the attendance data.

```javascript
{
  "_id": "ObjectId",
  "attendee_id": "string (unique)",
  "meeting_id": "ObjectId (references meetings collection)",
  "email": "string (lowercase)",
  "name": "string",
  "check_in_time": "ISODate | null",
  "device_fingerprint": "string | null",
  "location_info": {
    "latitude": "number | null",
    "longitude": "number | null",
    "address": "string | null",
    "ip_address": "string | null",
    "timestamp": "ISODate"
  },
  "device_info": {
    "browser": "string",
    "os": "string",
    "device": "string",
    "user_agent": "string"
  },
  "custom_field_responses": [
    {
      "field_name": "string",
      "value": "any"
    }
  ],
  "notes": "string | null",
  "created_at": "ISODate"
}
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB instance
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/axelmukwena/sunbird-frontend.git
cd sunbird-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root of the project and add your MongoDB connection string and other necessary keys.

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_BASE_URL=http://localhost:6001
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:6001](http://localhost:6001) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
