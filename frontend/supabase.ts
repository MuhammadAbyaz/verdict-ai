export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      courses: {
        Row: {
          createdAt: string
          description: string
          id: string
          level: string
          testId: string | null
          thumbnail: string | null
          title: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description: string
          id?: string
          level: string
          testId?: string | null
          thumbnail?: string | null
          title: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          description?: string
          id?: string
          level?: string
          testId?: string | null
          thumbnail?: string | null
          title?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_dc9991ea6115b0b50c59806b4ed"
            columns: ["testId"]
            isOneToOne: true
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          id: string
          moduleId: string | null
          order: number
          title: string
          videoUrl: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          moduleId?: string | null
          order: number
          title: string
          videoUrl?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          moduleId?: string | null
          order?: number
          title?: string
          videoUrl?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_16e7969589c0b789d9868782259"
            columns: ["moduleId"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          id: number
          name: string
          timestamp: number
        }
        Insert: {
          id?: number
          name: string
          timestamp: number
        }
        Update: {
          id?: number
          name?: string
          timestamp?: number
        }
        Relationships: []
      }
      modules: {
        Row: {
          courseId: string | null
          description: string
          id: string
          order: number
          title: string
          xp: number
        }
        Insert: {
          courseId?: string | null
          description: string
          id?: string
          order: number
          title: string
          xp: number
        }
        Update: {
          courseId?: string | null
          description?: string
          id?: string
          order?: number
          title?: string
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "FK_83489b37212a5a547bde8f89014"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          id: string
          questionId: string | null
          text: string
        }
        Insert: {
          id?: string
          questionId?: string | null
          text: string
        }
        Update: {
          id?: string
          questionId?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_46b668c49a6c4154d4643d875a5"
            columns: ["questionId"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correctOptionId: string | null
          id: string
          order: number
          question: string
          quizId: string | null
          testId: string | null
        }
        Insert: {
          correctOptionId?: string | null
          id?: string
          order: number
          question: string
          quizId?: string | null
          testId?: string | null
        }
        Update: {
          correctOptionId?: string | null
          id?: string
          order?: number
          question?: string
          quizId?: string | null
          testId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "FK_2d430ab05ee2d6fed1ae1f2b453"
            columns: ["correctOptionId"]
            isOneToOne: true
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_35d54f06d12ea78d4842aed6b6d"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "quizes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_94296641072b0f034d14e272cc6"
            columns: ["testId"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      quizes: {
        Row: {
          id: string
          moduleId: string | null
          order: number
          title: string
        }
        Insert: {
          id?: string
          moduleId?: string | null
          order: number
          title: string
        }
        Update: {
          id?: string
          moduleId?: string | null
          order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_0921273ca43878398b3afdd6634"
            columns: ["moduleId"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      "user-course": {
        Row: {
          courseId: string
          enrolledAt: string
          moduleProgress: number
          testProgress: string
          userId: string
        }
        Insert: {
          courseId: string
          enrolledAt?: string
          moduleProgress?: number
          testProgress: string
          userId: string
        }
        Update: {
          courseId?: string
          enrolledAt?: string
          moduleProgress?: number
          testProgress?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FK_4019794479179f9358f6b8f57ed"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "FK_a3d761aa5269f9af4758ab14cd6"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          createdAt: string
          email: string
          firstName: string
          id: string
          lastName: string
          password: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          firstName: string
          id?: string
          lastName: string
          password: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          firstName?: string
          id?: string
          lastName?: string
          password?: string
          updatedAt?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
