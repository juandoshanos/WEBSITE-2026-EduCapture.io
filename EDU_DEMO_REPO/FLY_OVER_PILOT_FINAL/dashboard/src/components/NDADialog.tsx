import { useState } from "react";
import { FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/lib/translations";

interface NDADialogProps {
  isOpen: boolean;
  onAccept: () => void;
  language: Language;
}

export const NDADialog = ({ isOpen, onAccept, language }: NDADialogProps) => {
  const { t } = useTranslation(language);
  const [hasRead, setHasRead] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleAccept = () => {
    if (hasRead && hasAgreed) {
      onAccept();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Non-Disclosure Agreement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <ScrollArea className="h-96 p-4 border rounded-md">
            <div className="space-y-4 text-sm">
              <h3 className="font-semibold text-primary">Rijschool Fly-Over BV - Non-Disclosure Agreement</h3>

              <p>
                This Non-Disclosure Agreement ("Agreement") is entered into between Rijschool Fly-Over BV ("Company")
                and the student ("Recipient") for the purpose of preventing the unauthorized disclosure of confidential information.
              </p>

              <h4 className="font-semibold">1. Definition of Confidential Information</h4>
              <p>
                "Confidential Information" includes all video recordings, lesson highlights, driving assessments,
                instructor feedback, proprietary teaching methods, and any other information that may be considered
                sensitive or proprietary to Rijschool Fly-Over BV.
              </p>

              <h4 className="font-semibold">2. Obligations of Recipient</h4>
              <p>
                The Recipient agrees to:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Hold all confidential information in strict confidence</li>
                <li>Not disclose any confidential information to third parties</li>
                <li>Use confidential information solely for learning purposes</li>
                <li>Not record, copy, or distribute lesson content without written permission</li>
              </ul>

              <h4 className="font-semibold">3. Video Recording and Lesson Highlights</h4>
              <p>
                All driving lessons may be recorded for educational and safety purposes. These recordings and any
                generated highlights are the exclusive property of Rijschool Fly-Over BV and may not be shared,
                distributed, or used for any purpose other than personal learning.
              </p>

              <h4 className="font-semibold">4. Term</h4>
              <p>
                This Agreement shall remain in effect for the duration of the student's enrollment and for a period
                of two (2) years following completion or termination of the driving course.
              </p>

              <h4 className="font-semibold">5. Legal Remedies</h4>
              <p>
                Any breach of this Agreement may result in immediate termination of services and legal action for
                damages. The Recipient acknowledges that monetary damages may not be sufficient remedy for breach
                of this Agreement.
              </p>

              <h4 className="font-semibold">6. Governing Law</h4>
              <p>
                This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction
                in which Rijschool Fly-Over BV operates.
              </p>

              <p className="text-muted-foreground text-xs mt-6">
                Last updated: January 2024
              </p>
            </div>
          </ScrollArea>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="read-agreement"
                checked={hasRead}
                onCheckedChange={(checked) => setHasRead(checked as boolean)}
              />
              <label htmlFor="read-agreement" className="text-sm font-medium">
                I have read and understood the entire agreement
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree-terms"
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked as boolean)}
                disabled={!hasRead}
              />
              <label htmlFor="agree-terms" className="text-sm font-medium">
                I agree to the terms and conditions of this Non-Disclosure Agreement
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              onClick={handleAccept}
              disabled={!hasRead || !hasAgreed}
              className="bg-gradient-primary"
            >
              <Check className="h-4 w-4 mr-2" />
              Accept and Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};