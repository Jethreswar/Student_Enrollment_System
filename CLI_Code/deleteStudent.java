package main.src;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

import main.utilities.exceptionhelper;
import main.utilities.scannerHelper;

public class deleteStudent {

    private static String bID;
    // Handle the deletion of a student
    public static void handleDeleteStudent(Connection conn) {
        try {
            display.displaySpecificTable("students", conn);
            scannerHelper.readString();
            System.out.print("\nChoose B# from above table: ");
            bID = scannerHelper.readString();
            // Call the method to delete the student
            deleteStudentbyID(conn);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    // Delete a student from the database by their B#
    public static void deleteStudentbyID(Connection conn) {
        // Call the stored procedure to delete the student
        try (CallableStatement cs = conn.prepareCall("{call student_management_system_pkg.delete_student(?)}")) {

            // Set the procedure parameter
            cs.setString(1, bID);

            // Execute the stored procedure
            cs.execute();
            System.out.println("Student deletion completed successfully.");

        } catch (SQLException e) {
            exceptionhelper.handleSQLException(e);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
