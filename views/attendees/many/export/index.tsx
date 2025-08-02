import {
  Calendar,
  CheckCircle,
  Download,
  FileSpreadsheet,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { FC, useEffect, useState } from "react";

import { Spinner } from "@/components/loaders/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useExportMeeting } from "@/hooks/meetings/export";
import { getFormattedDateAndTime } from "@/utilities/helpers/date";

interface ExportMeetingDialogProps {
  meetingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportMeetingDialog: FC<ExportMeetingDialogProps> = ({
  meetingId,
  open,
  onOpenChange,
}) => {
  const [exportComplete, setExportComplete] = useState(false);

  const {
    isExporting,
    isExportSupported,
    canExport,
    exportMeeting,
    meeting,
    attendeesCount,
    error,
  } = useExportMeeting({ meetingId });

  // Reset export complete state when dialog opens
  useEffect(() => {
    if (open) {
      setExportComplete(false);
    }
  }, [open]);

  const handleExport = async (): Promise<void> => {
    try {
      await exportMeeting();
      setExportComplete(true);
      // Auto-close after 2 seconds
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleClose = (): void => {
    if (!isExporting) {
      onOpenChange(false);
    }
  };

  if (!isExportSupported || error || !meeting) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileSpreadsheet className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <AlertDialogTitle>Export Not Available</AlertDialogTitle>
                  <AlertDialogDescription>
                    {error || "Excel export is not supported in your browser"}
                  </AlertDialogDescription>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleClose} variant="outline">
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Custom Header */}
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <AlertDialogTitle>Export Meeting Data</AlertDialogTitle>
                <AlertDialogDescription>
                  Download as Excel spreadsheet
                </AlertDialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isExporting}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </AlertDialogHeader>

        {/* Custom Content */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Meeting Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{meeting.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {getFormattedDateAndTime({ utc: meeting.start_datetime })}
                </span>
              </div>

              {meeting.address && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{meeting.address}</span>
                </div>
              )}

              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4 text-gray-400" />
                <span>
                  {attendeesCount} attendee{attendeesCount !== 1 ? "s" : ""}
                </span>
              </div>

              {meeting.expected_attendees && (
                <div className="text-gray-600">
                  <span className="text-gray-400">Expected:</span>{" "}
                  {meeting.expected_attendees}
                </div>
              )}
            </div>
          </div>

          {/* Export Contents */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Export Contents</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-semibold text-sm">
                      1
                    </span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">Summary</h5>
                  <p className="text-xs text-gray-500">
                    Statistics & attendance breakdown
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">
                    Meeting Info
                  </h5>
                  <p className="text-xs text-gray-500">
                    Details, settings & configuration
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-semibold text-sm">
                      3
                    </span>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">Attendees</h5>
                  <p className="text-xs text-gray-500">
                    Complete list with check-in data
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Included Data</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Personal information</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Check-in timestamps</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Location data</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Device information</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Feedback & ratings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <span>Meeting settings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export Status */}
          {exportComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    Export Successful!
                  </p>
                  <p className="text-sm text-green-700">
                    Your file has been downloaded.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Footer */}
        <AlertDialogFooter className="bg-gray-50 border-t border-gray-200 -m-6 mt-0 p-6">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-gray-500">
              File format: Excel (.xlsx)
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isExporting}
              >
                {exportComplete ? "Close" : "Cancel"}
              </Button>
              <Button
                onClick={handleExport}
                disabled={!canExport || isExporting || exportComplete}
                className="min-w-[120px]"
              >
                {isExporting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Exporting...
                  </>
                ) : exportComplete ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
