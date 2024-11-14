import React from 'react';
import { Card, CardContent, Button, Typography, Chip } from '@mui/joy'; // Added Chip for status indicators

const CardView = ({ clients, onEndVisit, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto p-4 sm:p-6 max-w-7xl bg-white rounded-lg shadow-lg my-4">
      {clients.map((client) => (
        <Card 
          key={client.id} 
          className="shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => onViewDetails(client)} // Open View Details on card click
        >
          <CardContent>
            {/* Client Info */}
            <div className="flex justify-between items-center mb-2">
              <Typography level="h5" className="font-semibold">
                {client.name}
              </Typography>
              {/* Status Indicator */}
              <Chip
                size="sm"
                variant="soft"
                color={client.status === 'active' ? 'success' : 'danger'}
              >
                {client.status === 'active' ? 'Active' : 'Inactive'}
              </Chip>
            </div>

            <Typography level="body2" className="text-gray-600 mb-2">
              {client.company_name}
            </Typography>
            <Typography level="body2" className="mb-1">
              <strong>Phone:</strong> {client.primary_mobile_no}
            </Typography>
            <Typography level="body2">
              <strong>Last Visit:</strong> {client.updated_at}
            </Typography>

            {/* Action Button */}
            <Button
              size="sm"
              color="danger"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking the button
                onEndVisit(client.id);
              }}
            >
              End Visit
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
