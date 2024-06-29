# Movie App
   Full stack application that manages movie entities, companies, and user registrations. The application allows CRUD operations, pagination, and supports both online and offline functionality.
   - Link to the backend: ```https://github.com/AndreiGota/MovieAppBackend```

# Key Features

## Frontend
- CRUD Operations: Implemented Create, Read, Update, Delete functionalities for movie entities and companies.
- Sorting and Pagination: Added sorting capabilities and frontend pagination for efficient data navigation.
- UI/UX: Designed a user-friendly interface focusing on smooth user interactions.
- Charts: Integrated charts to visualize movie-related data.
- Offline Support: Ensured the application works offline, with data syncing when connectivity is restored.
- Infinite Scroll: Implemented infinite scrolling for an enhanced user experience.

## Backend
- CRUD Operations: Developed robust CRUD functionalities for managing movie and company data.
- Comprehensive Tests: Wrote extensive tests to ensure backend reliability.
- Backend Pagination: Enabled backend pagination for handling large datasets efficiently.
- WebSockets: Used WebSockets to send random movie entities from the server to the client at regular intervals.
- One-to-Many Relationship: Maintained a one-to-many relationship between companies and movies in the database.
- Aggregated Endpoints: Created endpoints to provide paginated, aggregated information from related database tables.
- Authentication: Secured endpoints with JWT for user authentication.
