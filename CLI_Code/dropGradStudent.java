package main.src;

import java.sql.*;

import main.utilities.exceptionhelper;

import main.utilities.scannerHelper;

public class dropGradStudent {

    private static String bID ;
    private static String classID ;
    // Handle the dropping of a student from a class
    public static void handleDropStudent(Connection conn) throws SQLException{
        try {
            // Display the enrollments table
            display.displaySpecificTable("g_enrollments",conn);
            scannerHelper.readString();
            System.out.print("\nChoose B# from above table: ");
            bID = scannerHelper.readString();
            // Display the classes table
            System.out.println("Choose class id from above table");
            classID = scannerHelper.readString();
            // Call the method to drop the student
            dropStudent(conn);

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public static void dropStudent(Connection conn) throws SQLException{
        try (
            CallableStatement cs = conn.prepareCall("{call student_management_system_pkg.drop_grad_student_from_class(?, ?)}")) {
            // Set the procedure parameters
            cs.setString(1, bID);
            cs.setString(2, classID);

            // Execute the stored procedure
            cs.execute();
            System.out.println("Student dropped from class successfully.");
            
        } catch (SQLException e) {
            exceptionhelper.handleSQLException(e);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
