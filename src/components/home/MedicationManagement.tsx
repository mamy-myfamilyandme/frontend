//type import
import { Screen } from "../../types";

// Props 타입 - 부모(App.tsx)에서 받는 것
interface MedicationManagementProps {
  currentScreen: Screen;      // 현재 어떤 화면인지
  onNavigate: (screen: Screen) => void;  // 화면 바꾸는 함수
}

// 내부 타입들 - 이 컴포넌트에서만 쓰임
type TimeSlot = "MORNING" | "LUNCH" | "DINNER" | "BEDTIME";  // 복약 시간대
type ViewMode = "TODAY" | "WEEKLY" | "MONTHLY"; 

interface Medication {        // 약 하나의 정보
  id: number;
  name: string;               // 약 이름
  dosage: string;             // 용량 (예: "1정")
  condition: string;          // 증상 (예: "혈압")
  timeSlot: TimeSlot;         // 언제 먹는지
  taken: boolean;             // 복용 완료 여부
  time: string;               // 시간 (예: "08:00")
}

export function MedicationManagement({
  currentScreen,   // 구조분해 할당으로 props 받기
  onNavigate,
}: MedicationManagementProps) {
  return (
    <div>
      <h1>복약 관리</h1>
    </div>
  );
}