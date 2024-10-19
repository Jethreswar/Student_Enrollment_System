package main.src;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

import main.utilities.exceptionhelper;
import main.utilities.scannerHelper;

public class enrollment {

    private static String bID;
    private static String classID;

    // Handle the enrollment of a student
    public static void handleEnrollment(Connection conn){
        try {
            scannerHelper.readString();
            // Display the enrollments table
            System.out.print("\nChoose B# from above table: ");
            bID = scannerHelper.readString();
            System.out.println("Choose class id from above table");
            // Display the classes table
            classID = scannerHelper.readString();
            // Call the method to enroll the student
            enrollStudent(conn);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void enrollStudent(Connection conn) {
        // Call the stored procedure to enroll the student
        try (CallableStatement cs = conn.prepareCall("{call student_management_system_pkg.enroll_student(?, ?)}")) {
            // Set the procedure parameters
            cs.setString(1, bID);
            cs.setString(2, classID);
            //  Execute the stored procedure
            cs.execute();
            System.out.println("Enrollment completed successfully.");
            // Handle the exception
        } catch (SQLException e) {
            exceptionhelper.handleSQLException(e);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
