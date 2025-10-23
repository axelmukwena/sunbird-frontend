import { User as UserIcon } from "lucide-react";
import { FC } from "react";

import { UserKind, UserStatus } from "@/api/services/weaver/users/types";
import { BadgeDisplayRow } from "@/components/data-display/badge";
import { DataDisplayContainer } from "@/components/data-display/container";
import { DateDisplayRow } from "@/components/data-display/date";
import { EmailDisplayRow } from "@/components/data-display/email";
import { ImagesDisplayRow } from "@/components/data-display/images";
import { PhonenumberDisplayRow } from "@/components/data-display/phonenumber";
import { TextDisplayRow } from "@/components/data-display/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUserContext } from "@/contexts/current-user";
import { Variant } from "@/types/general";
import { mergeTailwind } from "@/utilities/helpers/tailwind";

interface ProfileContentViewProps {
  className?: string;
}

/**
 * A view component to display the details of a single user.
 */
export const ProfileContentView: FC<ProfileContentViewProps> = ({
  className = "",
}) => {
  const { currentUser: user, isLoading, error } = useCurrentUserContext();
  const fullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .join(" ");
  const initials = `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`;

  // Helper to format enum values into human-readable strings
  const formatEnumValue = (value: string): string => {
    return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Helper to get a badge variant based on user status
  const getStatusVariant = (status: UserStatus): Variant => {
    switch (status) {
      case UserStatus.ACTIVE:
        return "default";
      case UserStatus.DEACTIVATED:
        return "secondary";
      case UserStatus.PENDING:
        return "secondary";
      default:
        return "outline";
    }
  };

  // Helper to get a badge variant based on user kind
  const getKindVariant = (kind: UserKind): Variant => {
    switch (kind) {
      case UserKind.INTERNAL:
        return "default";
      case UserKind.EXTERNAL:
        return "secondary";
      case UserKind.SYSTEM:
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className={`${className} animate-pulse`}>
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} p-6 text-center`}>
        <div className="text-red-600 text-sm">Error loading user: {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`${className} p-6 text-center`}>
        <div className="text-gray-500 text-sm">No user selected</div>
      </div>
    );
  }

  return (
    <div className={mergeTailwind(className, "w-full")}>
      {/* User Header */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url || ""} alt={fullName} />
          <AvatarFallback className="text-xl">
            {initials || <UserIcon />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Personal & Contact Information */}
      <DataDisplayContainer
        title="User Details"
        description="Personal and contact information"
        className="mb-8"
      >
        <TextDisplayRow label="First Name" value={user.first_name} />
        <TextDisplayRow label="Last Name" value={user.last_name} />
        <EmailDisplayRow
          label="Email Address"
          caption={user.email_verified_datetime ? "Verified" : "Not verified"}
          value={user.email}
        />
        <PhonenumberDisplayRow
          label="Phone Number"
          caption={
            user.phone_number_verified_datetime ? "Verified" : "Not verified"
          }
          value={user.phone_number}
        />
        <TextDisplayRow label="Organisation" value={user.organisation_name} />
        <TextDisplayRow label="Division" value={user.division} />
        <TextDisplayRow label="Occupation" value={user.occupation} />
        <TextDisplayRow
          label="Preferred Language"
          value={user.language.toUpperCase()}
        />
      </DataDisplayContainer>

      {/* Status & Roles */}
      <DataDisplayContainer
        title="Status & Roles"
        description="System status and administrative roles"
        className="mb-8"
      >
        <BadgeDisplayRow
          label="Status"
          value={formatEnumValue(user.status)}
          variant={getStatusVariant(user.status)}
        />
        <BadgeDisplayRow
          label="User Kind"
          value={formatEnumValue(user.kind)}
          variant={getKindVariant(user.kind)}
        />
        <BadgeDisplayRow
          label="Admin Access"
          value={user.is_admin ? "Yes" : "No"}
          variant={user.is_admin ? "destructive" : "secondary"}
        />
        <BadgeDisplayRow
          label="Superuser"
          value={user.is_superuser ? "Yes" : "No"}
          variant={user.is_superuser ? "destructive" : "secondary"}
        />
      </DataDisplayContainer>

      {/* Avatar File Details */}
      {user.avatar && (
        <DataDisplayContainer
          title="Avatar"
          description="User's profile picture"
          className="mb-8"
        >
          <ImagesDisplayRow
            label="Avatar Image"
            images={[user.avatar]}
            gridCols={1}
            showMetadata={true}
          />
        </DataDisplayContainer>
      )}

      {/* Activity & Metadata */}
      <DataDisplayContainer
        title="System Information"
        description="Activity and record metadata"
      >
        <DateDisplayRow
          label="Last Logged In"
          value={user.last_logged_in_at}
          format="datetime"
        />
        <DateDisplayRow
          label="Last Active"
          value={user.last_active_at}
          format="datetime"
        />
        <DateDisplayRow
          label="Date Created"
          value={user.created_at}
          format="datetime"
        />
        <DateDisplayRow
          label="Last Updated"
          value={user.updated_at}
          format="datetime"
        />
        <TextDisplayRow
          label="User ID"
          caption="Unique identifier"
          value={user.id}
        />
      </DataDisplayContainer>
    </div>
  );
};
